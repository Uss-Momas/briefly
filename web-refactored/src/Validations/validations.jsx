import { z } from "zod";

export const signupSchema = z.object({
    email: z.string().email({ message: "Email is not valid" }),
    firstName: z.string().min(3, { message: 'First name must include at least 3 characters' }).max(64),
    lastName: z.string().max(64).optional(),
    password: z.string().min(8, { message: "Password is too short" }).max(32, { message: "Password is too long" }),
    confirmPassword: z.string(),
    termsAgreement: z.boolean(),
}).refine((data) => data.password === data.confirmPassword, { message: "Passwords do not match", path: ["confirmPassword"] }).refine((data) => data.termsAgreement === true, { message: "Can't signup", path: ["termsAgreement"] });


export const loginSchema = z.object({
    email: z.string().email({ message: "Email is not valid" }),
    password: z.string({ message: "Password must be letters, numbers and special characters" }).min(1, { message: "Password can't be empty" }),
});

const urlPattern = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
export const shortURLSchema = z.object({
    originalUrl: z.string().regex(urlPattern, { message: "Provide a valid URL" }),
    code: z.union([z.string().min(3, { message: "Must be 3 or more characters long" }).max(10, { message: "Must be 10 or less characters long" }), z.literal("")]).optional(),
});

export const updateUserSchema = z.object({
    firstName: z.string().min(3, { message: 'First name must include at least 3 characters' }).max(64),
    lastName: z.string().max(64).optional(),
});

export const updateUserPasswordSchema = z.object({
    password: z.string().min(8, { message: "Password is too short" }).max(32, { message: "Password is too long" }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, { message: "Passwords do not match", path: ["confirmPassword"] });