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

    department: z.string({ message: 'Department is required' }).refine(
      (val) => {
        // Check if it's a valid ObjectId (24 characters hexadecimal)
        const objectIdRegex = /^[0-9a-fA-F]{24}$/;
        if (objectIdRegex.test(val)) {
          return true;
        }

        // Check if it's a valid department value
        return Object.values(DEPARTMENTS).includes(
          val as (typeof DEPARTMENTS)[keyof typeof DEPARTMENTS],
        );
      },
      { message: 'Department must be a valid ObjectId or department name' },
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
