# Search, Filter, Sort & Pagination Guide

This guide explains how to use the enhanced API endpoints with search, filtering, sorting, and pagination capabilities.

## Overview

All major endpoints now support:

- **Search**: Full-text search across relevant fields
- **Filter**: Field-specific filtering with operators
- **Sort**: Flexible sorting options
- **Pagination**: Efficient data pagination

## Query Parameters

### Search

- `searchTerm`: Text to search across multiple fields
- Example: `?searchTerm=complaint`

### Pagination

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- Example: `?page=2&limit=20`

### Sorting

- `sort`: Field(s) to sort by with direction
- Use `-` prefix for descending order
- Example: `?sort=-createdAt,title` (newest first, then by title)

### Filtering

- Use field names as query parameters
- Supports range queries with operators
- Example: `?status=pending&priority=high`

### Field Selection

- `fields`: Specific fields to return
- Example: `?fields=title,description,status`

## Range Operators

For date, number, and other range queries:

- `field[gte]`: Greater than or equal
- `field[gt]`: Greater than
- `field[lte]`: Less than or equal
- `field[lt]`: Less than

Example: `?createdAt[gte]=2023-01-01&createdAt[lt]=2024-01-01`

## API Endpoints

### Complaints

#### Get Complaints (Authenticated)

```
GET /api/v1/complaints
```

**Query Parameters:**

- `searchTerm`: Search in title, description, category
- `status`: Filter by status (pending, resolved, etc.)
- `priority`: Filter by priority (low, medium, high)
- `department`: Filter by department ID
- `visibility`: Filter by visibility (public, private)
- `sort`: Sort options
- `page`, `limit`: Pagination

**Examples:**

```
GET /api/v1/complaints?searchTerm=water&status=pending&page=1&limit=10
GET /api/v1/complaints?priority=high&sort=-createdAt
GET /api/v1/complaints?department=507f1f77bcf86cd799439011&visibility=public
```

#### Get Public Complaints

```
GET /api/v1/complaints/public
```

**Query Parameters:** Same as above (no authentication required)

**Examples:**

```
GET /api/v1/complaints/public?searchTerm=road&sort=-votes
GET /api/v1/complaints/public?category=infrastructure&limit=20
```

### Users (SuperAdmin Only)

#### Get All Users

```
GET /api/v1/users
```

**Query Parameters:**

- `searchTerm`: Search in firstName, lastName, email, phone, department, designation
- `role`: Filter by role (user, admin, superAdmin)
- `department`: Filter by department
- `isDeleted`: Filter by deletion status
- `isBanned`: Filter by ban status
- `sort`: Sort options
- `page`, `limit`: Pagination

**Examples:**

```
GET /api/v1/users?searchTerm=john&role=admin&page=1&limit=15
GET /api/v1/users?department=IT&sort=firstName
GET /api/v1/users?isBanned=false&sort=-createdAt
```

## Response Format

All paginated endpoints return data in this format:

```json
{
  "success": true,
  "message": "Data retrieved successfully",
  "data": [...], // Array of results
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 150,
    "totalPages": 15,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

## Advanced Examples

### Complex Complaint Search

```
GET /api/v1/complaints?searchTerm=water&status=pending&priority=high&sort=-createdAt&page=2&limit=5
```

### User Search with Multiple Filters

```
GET /api/v1/users?searchTerm=admin&role=admin&department=Engineering&sort=firstName,-createdAt&limit=20
```

### Date Range Filtering

```
GET /api/v1/complaints?createdAt[gte]=2024-01-01&createdAt[lt]=2024-12-31&sort=-createdAt
```

### Field Selection

```
GET /api/v1/complaints/public?fields=title,description,status,createdAt&limit=50
```

## Performance Tips

1. **Use pagination**: Always specify reasonable `limit` values
2. **Use field selection**: Request only needed fields with `fields` parameter
3. **Use specific filters**: More specific filters perform better than broad searches
4. **Sort efficiently**: Sort by indexed fields when possible

## Error Handling

- Invalid sort fields: Returns 400 Bad Request
- Invalid pagination values: Uses defaults
- Invalid filter values: Returns 400 Bad Request
- No results found: Returns empty array with pagination info
