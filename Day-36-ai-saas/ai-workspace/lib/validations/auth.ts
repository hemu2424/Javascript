import { z } from "zod";

export const signupSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters"),

  email: z
    .email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain one uppercase letter")
    .regex(/[a-z]/, "Must contain one lowercase letter")
    .regex(/[0-9]/, "Must contain one number"),
});

export type SignupInput = z.infer<typeof signupSchema>;

export const LoginSchema = z.object({
  email: z
    .email("Invalid email address"),
    password:z
   .string()
    .min(8, "Password must be at least 8 characters")
   
})