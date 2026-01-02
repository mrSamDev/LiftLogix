import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  email: z.string().email(),
  emailVerified: z.boolean(),
  name: z.string(),
  image: z.string().nullable().optional(),
  role: z.enum(["coach", "admin", "user"]),
  unitPreference: z.literal("gram"),
  orgId: z.string().optional(),
});

export interface User extends z.infer<typeof UserSchema> {}

export const UserInputSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(1, "Name is required"),
  role: z.enum(["coach", "admin", "user"]),
  orgId: z.string().optional(),
});

export interface UserInput extends z.infer<typeof UserInputSchema> {}

export const UserUpdateSchema = z.object({
  email: z.string().email("Invalid email address").optional(),
  name: z.string().min(1, "Name is required").optional(),
  role: z.enum(["coach", "admin", "user"]).optional(),
  orgId: z.string().optional(),
});

export interface UserUpdate extends z.infer<typeof UserUpdateSchema> {}
