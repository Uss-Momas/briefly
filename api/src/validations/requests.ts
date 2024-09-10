import { z } from 'zod';

export const shortlinkRequestBodySchema = z.object({
    originalUrl: z.string().url(),
    code: z.string().min(3, { message: "Must be 3 or more characters long" }).max(10, { message: "Must be 10 or less characters long" }).optional(),
});

export const shortlinkRequestParamSchema = z.object({
    id: z.string().uuid({ message: 'Must be a UUID type' }),
});


// Users section
export const idRequestParamSchema = z.object({
    id: z.string().uuid({ message: 'Must be a UUID type' }),
});

export const userBodyRequestSchema = z.object({
    name: z.string().min(3).max(255),
    email: z.string().email({ message: 'Email is not valid!' }),
    password: z.string().min(6),
    roleCode: z.enum(['01', '02'])
});