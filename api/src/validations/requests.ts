import { z } from 'zod';

export const shortlinkRequestBodySchema = z.object({
    originalUrl: z.string().url(),
    code: z.string().min(3, { message: "Must be 3 or more characters long" }).max(10, { message: "Must be 10 or less characters long" }).optional(),
})