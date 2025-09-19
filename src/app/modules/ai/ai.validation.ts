import z from 'zod';

const analyzeComplaintsBatchSchema = z.object({
  body: z.object({
    complaintIds: z
      .array(z.string({ message: 'Complaint ID must be a string' }))
      .min(1, 'At least one complaint ID is required')
      .max(100, 'Maximum 100 complaints can be analyzed at once'),
    location: z
      .object({
        thana: z.string().optional(),
        district: z.string().optional(),
        division: z.string().optional(),
        postCode: z.string().optional(),
      })
      .optional(),
  }),
});

const analyzeComplaintsByLocationSchema = z.object({
  body: z.object({
    location: z
      .object({
        thana: z.string().optional(),
        district: z.string().optional(),
        division: z.string().optional(),
        postCode: z.string().optional(),
      })
      .refine(
        (data) => {
          // At least one location field must be provided
          return data.thana || data.district || data.division || data.postCode;
        },
        { message: 'At least one location parameter must be provided' },
      ),
  }),
});

export const AIValidation = {
  analyzeComplaintsBatchSchema,
  analyzeComplaintsByLocationSchema,
};
