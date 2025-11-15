import { z } from "zod";
export const signupSchema = z.object({
    name: z.string().min(1, "Name required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters")
});
export const loginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(1, "Password required")
});
export const forgotSchema = z.object({
    email: z.string().email("Invalid email")
});
export const resetSchema = z.object({
    password: z.string().min(6, "Password must be at least 6 characters")
});
