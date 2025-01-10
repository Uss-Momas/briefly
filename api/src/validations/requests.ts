import { z } from 'zod';

const urlPattern = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

export const shortlinkRequestBodySchema = z.object({
    originalUrl: z.string().regex(urlPattern, { message: "Provide a valid URL" }),
    code: z.union([z.string().min(3, { message: "Must be 3 or more characters long" }).max(10, { message: "Must be 10 or less characters long" }), z.literal("")]).optional(),
});

export const shortlinkRequestParamSchema = z.object({
    id: z.string().uuid({ message: 'Must be a UUID type' }),
});

export const shortlinkCodeParamSchema = z.object({
    code: z.string({ message: 'Code must be string' }),
});

export const paginationQuerySchema = z.object({
    page: z.number({ message: 'Page query param must be a number' }).min(1, { message: 'Page must be greater or equal to 1' }).optional(),
    limit: z.number({ message: 'Limit query param must be a number' }).min(2, { message: 'Page must be greater or equal to 1' }).optional(),
});


// Users section
export const idRequestParamSchema = z.object({
    id: z.string().uuid({ message: 'Must be a UUID type' }),
});

export const userBodyRequestSchema = z.object({
    firstName: z.string().min(3).max(64),
    lastName: z.string().max(64).optional(),
    email: z.string().email({ message: 'Email is not valid!' }),
    password: z.string().min(8),
    roleCode: z.enum(['01', '02'])
});

export const updateUserSchema = z.object({
    firstName: z.string().min(3, { message: "First name must include at least 3 characters" }).max(64),
    lastName: z.string().max(64).optional(),
});

export const updateUserPasswordSchema = z.object({
    password: z.string().min(8, { message: "Password is too short" }).max(32, { message: "Password is too long" }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, { message: "Passwords do not match", path: ["confirmPassword"] });

// Auth validations
export const authSignupRequestBodySchema = z.object({
    firstName: z.string().min(3, { message: "First name must include at least 3 characters" }).max(64),
    lastName: z.string().max(64).optional(),
    email: z.string({ message: "Email is required" }).email({ message: 'Email is not valid!' }),
    password: z.string({ message: "Password is required" }).min(6),
}, { message: '{Name, Email, Password} is required' });

export const authLoginRequestBodySchema = z.object({
    email: z.string({ message: "Email is required" }).email({ message: 'Email is not valid!' }),
    password: z.string({ message: "Password is required" }).min(6, { message: 'Password must contain at least 6 character(s)' }),
}, { message: 'Login Object is required!' });