import { z } from "zod";

export const UserRoleSchema = z.enum(["coach", "admin", "user"]);

export type UserRole = z.infer<typeof UserRoleSchema>;

export const ApiUserSchema = z.object({
  _id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  email: z.string().email(),
  emailVerified: z.boolean(),
  name: z.string(),
  image: z.string().nullable().optional(),
  role: UserRoleSchema.default("user"),
  unitPreference: z.literal("gram").default("gram"),
  isActive: z.boolean().optional(),
  orgId: z.string().optional(),
  coachId: z.string().nullable().optional(),
});

export type ApiUser = z.infer<typeof ApiUserSchema>;

export const UserSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  email: z.string().email(),
  emailVerified: z.boolean(),
  name: z.string(),
  image: z.string().nullable().optional(),
  role: UserRoleSchema,
  unitPreference: z.literal("gram"),
  isActive: z.boolean().optional(),
  orgId: z.string().optional(),
  coachId: z.string().nullable().optional(),
  metrics: z
    .object({
      weight: z.number().optional(),
      height: z.number().optional(),
      bodyFat: z.number().optional(),
    })
    .optional(),
});

export interface User extends z.infer<typeof UserSchema> {}

export const userTransformer = {
  fromAPI(apiUser: unknown): User {
    const validated = ApiUserSchema.parse(apiUser);
    return {
      id: validated._id,
      createdAt: new Date(validated.createdAt),
      updatedAt: new Date(validated.updatedAt),
      email: validated.email,
      emailVerified: validated.emailVerified,
      name: validated.name,
      image: validated.image,
      role: validated.role,
      unitPreference: validated.unitPreference,
      isActive: validated.isActive,
      orgId: validated.orgId,
      coachId: validated.coachId,
    };
  },
};

export const UserInputSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(1, "Name is required"),
  role: UserRoleSchema,
  orgId: z.string().optional(),
});

export interface UserInput extends z.infer<typeof UserInputSchema> {}

export const UserUpdateSchema = z.object({
  email: z.string().email("Invalid email address").optional(),
  name: z.string().min(1, "Name is required").optional(),
  role: UserRoleSchema.optional(),
  orgId: z.string().optional(),
  coachId: z.string().nullable().optional(),
});

export interface UserUpdate extends z.infer<typeof UserUpdateSchema> {}
