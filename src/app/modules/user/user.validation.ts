import z from "zod";
import { IsActive, Role } from "./user.interface";

// For create user
export const createUserZodSchema = z.object({
    name: z
        .string()
        .min(2, { message: "Name must be at least 2 characters long." })
        .max(50, { message: "Name cannot exceed 50 characters." })
        .refine((val) => typeof val === "string", {
            message: "Name must be a string",
        }),
    email: z
        .email({ message: "Invalid email address format." })
        .min(5, { message: "Email must be at least 5 characters long." })
        .max(100, { message: "Email cannot exceed 100 characters." }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long." })
        .regex(/^(?=.*[A-Z])/, {
            message: "Password must contain at least 1 uppercase letter.",
        })
        .regex(/^(?=.*[!@#$%^&*])/, {
            message: "Password must contain at least 1 special character.",
        })
        .regex(/^(?=.*\d)/, {
            message: "Password must contain at least 1 number.",
        }),
    phone: z
        .string()
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
            message: "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
        })
        .optional(),
    address: z
        .string()
        .max(200, { message: "Address cannot exceed 200 characters." })
        .optional(),
    role: z.enum(Role)
});

// For update user
export const updateUserZodSchema = createUserZodSchema.partial(); /* All the all fields are optional, because the user might update just one or two fields. */

// If the update schema has fields not present in the create schema (e.g., isDeleted, isVerified, etc.), then use .extend() like this:
export const updateUserZodSchema = createUserZodSchema
    .partial()
    .extend({
        role: z
            .enum(Object.values(Role) as [string]) 
            .optional(),
        isActive: z
            .enum(Object.values(IsActive) as [string]) 
            .optional(),
        isDeleted: z
            .boolean()
            .optional(),
        isVerified: z
            .boolean()
            .optional(),
    });
