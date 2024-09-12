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

// Auth validations
export const authSignupRequestBodySchema = z.object({
    name: z.string({ message: "Name is required" }).min(3).max(255),
    email: z.string({ message: "Email is required" }).email({ message: 'Email is not valid!' }),
    password: z.string({ message: "Password is required" }).min(6),
}, { message: '{Name, Email, Password} is required' });

export const authLoginRequestBodySchema = z.object({
    email: z.string({ message: "Email is required" }).email({ message: 'Email is not valid!' }),
    password: z.string({ message: "Password is required" }).min(6, { message: 'Password must contain at least 6 character(s)' }),
}, { message: 'Login Object is required!' });