import z from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    firstName: z.string({ message: 'First name is required' }).min(2).max(100),
    lastName: z.string({ message: 'Last name is required' }).min(2).max(100),
    email: z.string({ message: 'Email is required' }),
    password: z.string({ message: 'Password is required' }).min(6 ,{ message: 'Password must be at least 6 characters long' }).max(100),
    phone: z.string({ message: 'Phone number is required' }).min(11).max(15),
    designation: z.string().max(100).optional(),
    department: z.string().max(100).optional(),
    postCode: z.string({ message: 'Post code is required' }),
    thana: z.string({ message: 'Thana is required' }).min(2).max(100),
    district: z.string({ message: 'District is required' }).min(2).max(100),
    division: z.string({ message: 'Division is required' }).min(2).max(100),
    address: z.string({ message: 'Address is required' }).min(10).max(200),
    role: z.enum(['admin', 'superAdmin', 'user']),
    isDeleted: z.boolean().default(false),
    isBanned: z.boolean().default(false),
    profileImg: z.string().optional(),
    passwordChangedAt: z.date().optional(),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    firstName: z.string().min(2).max(100).optional(),
    lastName: z.string().min(2).max(100).optional(),
    phone: z.string().min(11).max(15).optional(),
    designation: z.string().max(100).optional(),
    password: z.string().min(6 ,{ message: 'Password must be at least 6 characters long' }).max(100).optional(),
    department: z.string().max(100).optional(),
    postCode: z.string().optional(),
    thana: z.string().min(2).max(100).optional(),
    district: z.string().min(2).max(100).optional(),
    division: z.string().min(2).max(100).optional(),
    address: z.string().min(10).max(200).optional(),
    role: z.enum(['admin', 'superAdmin', 'user']).optional(),
    isDeleted: z.boolean().default(false).optional(),
    isBanned: z.boolean().default(false).optional(),
    profileImg: z.string().optional(),
    passwordChangedAt: z.date().optional(),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
