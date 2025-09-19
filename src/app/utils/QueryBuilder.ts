/* eslint-disable @typescript-eslint/no-explicit-any */
import { Query } from 'mongoose';
import {
  TQuery,
  TPaginationResult,
  TSortOptions,
  TFilterOptions,
} from '../interface/query';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: TQuery;

  constructor(modelQuery: Query<T[], T>, query: TQuery) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field) => ({
          [field]: {
            $regex: searchTerm,
            $options: 'i',
          },
        })),
      } as any);
    }

    return this;
  }

  filter() {
    const queryObj = { ...this.query }; // copy

    // Filtering
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

    excludeFields.forEach((el) => delete queryObj[el]);

    // Build filter object
    const filterObj: TFilterOptions = {};

    Object.keys(queryObj).forEach((key) => {
      const value = queryObj[key];

      if (value !== undefined) {
        // Handle special operators
        if (typeof value === 'string') {
          // Handle range queries like: createdAt[gte]=2023-01-01
          if (key.includes('[') && key.includes(']')) {
            const [field, operator] = key.split('[');
            const cleanOperator = operator.replace(']', '');

            if (!filterObj[field]) {
              filterObj[field] = {};
            }

            (filterObj[field] as Record<string, any>)[`$${cleanOperator}`] =
              value;
          } else {
            // Exact match for strings
            filterObj[key] = value;
          }
        } else {
          // Direct assignment for other types
          filterObj[key] = value;
        }
      }
    });

    this.modelQuery = this.modelQuery.find(filterObj as any);

    return this;
  }

  sort() {
    let sortOptions: TSortOptions = {};

    if (this.query?.sort) {
      const sortBy = this.query.sort.split(',').join(' ');
      this.modelQuery = this.modelQuery.sort(sortBy);
    } else {
      // Default sort by creation date (newest first)
      sortOptions = { createdAt: -1 };
      this.modelQuery = this.modelQuery.sort(sortOptions);
    }

    return this;
  }

  paginate() {
    const page = Number(this.query?.page) || 1;
    const limit = Number(this.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  fields() {
    if (this.query?.fields) {
      const fields = this.query.fields.split(',').join(' ');
      this.modelQuery = this.modelQuery.select(fields);
    } else {
      this.modelQuery = this.modelQuery.select('-__v');
    }

    return this;
  }

  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    return await this.modelQuery.model.countDocuments(totalQueries);
  }

  async getPaginationInfo(): Promise<TPaginationResult> {
    const page = Number(this.query?.page) || 1;
    const limit = Number(this.query?.limit) || 10;
    const total = await this.countTotal();
    const totalPages = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };
  }
}

export default QueryBuilder;
