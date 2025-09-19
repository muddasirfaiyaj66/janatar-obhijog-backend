import z from 'zod';
import {
  COMPLAINT_PRIORITY,
  COMPLAINT_VISIBILITY,
  DEPARTMENTS,
} from './complaint.constant';

const createComplaintValidationSchema = z.object({
  body: z.object({
    title: z
      .string({ message: 'Title is required' })
      .min(5, 'Title must be at least 5 characters')
      .max(200, 'Title cannot exceed 200 characters'),
    description: z
      .string({ message: 'Description is required' })
      .min(10, 'Description must be at least 10 characters'),
    category: z
      .string({ message: 'Category is required' })
      .min(1, 'Category cannot be empty'),

    // Location validation
    postCode: z
      .string({ message: 'Post code is required' })
      .min(3, 'Post code must be at least 3 characters')
      .max(10, 'Post code cannot exceed 10 characters')
      .regex(/^[0-9]+$/, 'Post code must contain only numbers'),
    thana: z
      .string({ message: 'Thana is required' })
      .min(2, 'Thana must be at least 2 characters')
      .max(100, 'Thana cannot exceed 100 characters')
      .trim(),
    district: z
      .string({ message: 'District is required' })
      .min(2, 'District must be at least 2 characters')
      .max(100, 'District cannot exceed 100 characters')
      .trim(),
    division: z
      .string({ message: 'Division is required' })
      .min(2, 'Division must be at least 2 characters')
      .max(100, 'Division cannot exceed 100 characters')
      .trim(),
    address: z
      .string({ message: 'Address is required' })
      .min(10, 'Address must be at least 10 characters')
      .max(500, 'Address cannot exceed 500 characters')
      .trim(),

    priority: z
      .enum([
        COMPLAINT_PRIORITY.LOW,
        COMPLAINT_PRIORITY.MEDIUM,
        COMPLAINT_PRIORITY.HIGH,
        COMPLAINT_PRIORITY.URGENT,
      ] as [string, ...string[]])
      .default(COMPLAINT_PRIORITY.MEDIUM),

    visibility: z
      .enum([COMPLAINT_VISIBILITY.PUBLIC, COMPLAINT_VISIBILITY.PRIVATE] as [
        string,
        ...string[],
      ])
      .default(COMPLAINT_VISIBILITY.PUBLIC),

    department: z.enum(Object.values(DEPARTMENTS) as [string, ...string[]]).or(
      z.string().refine(
        (val) => {
          // Check if it's a valid department value (string)
          const departmentValues = Object.values(DEPARTMENTS) as string[];
          return departmentValues.includes(val);
        },
        { message: 'Department must be a valid department name' },
      ),
    ),
    isAnonymous: z.boolean().default(false),
  }),
});

const commentValidationSchema = z.object({
  body: z.object({
    text: z
      .string({ message: 'Comment text is required' })
      .min(1, 'Comment cannot be empty')
      .max(1000, 'Comment cannot exceed 1000 characters'),
  }),
});

const resolveComplaintValidationSchema = z.object({
  body: z.object({
    comment: z.string().optional(),
  }),
});

export const ComplaintValidation = {
  createComplaintValidationSchema,
  commentValidationSchema,
  resolveComplaintValidationSchema,
};
