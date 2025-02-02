import { z } from "zod";

export const userSignupSchema = z.object({
  fullName: z.string().min(3, "Full name should be at least 3 characters !"),
  email: z.string().email("Invalid Email !"),
  password: z.string().min(8, "Password must be at least 8 characters !"),
  contact: z.string().min(10, "Contact should be 10 digits"),
});
export const userLoginSchema = z.object({
  email: z.string().email("Invalid Email !"),
  password: z.string().min(8, "Password must be at least 8 characters !"),
});

export type SignupInputState = z.infer<typeof userSignupSchema>;
export type LoginInputState = z.infer<typeof userLoginSchema>;
