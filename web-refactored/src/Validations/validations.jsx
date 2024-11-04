import { z } from "zod";

export const signupSchema = z.object({
    email: z.string().email({ message: "Email is not valid" }),
    firstName: z.string().min(3).max(64),
    password: z.string().min(8, { message: "Password is too short" }).max(32, { message: "Password is too long" }),
    confirmPassword: z.string(),
    termsAgreement: z.boolean(),
}).refine((data) => data.password === data.confirmPassword, { message: "Passwords do not match", path: ["confirmPassword"] }).refine((data) => data.termsAgreement === true, { message: "Can't signup", path: ["termsAgreement"] });