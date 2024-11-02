import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Email is invalid.",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters long.",
  }),
});
export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = loginSchema.extend({
  username: z.string().min(4, {
    message: "Username must be at least 4 characters long.",
  }),
});
export type RegisterSchema = z.infer<typeof registerSchema>;
