import { z } from "zod";
import { UserSchema } from "./user";

export const SessionSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string(),
  expiresAt: z.date(),
  token: z.string(),
  ipAddress: z.string().nullable().optional(),
  userAgent: z.string().nullable().optional(),
});

export const SessionWithUserSchema = z.object({
  session: SessionSchema,
  user: UserSchema,
});

export interface Session extends z.infer<typeof SessionSchema> {}
export interface SessionWithUser extends z.infer<typeof SessionWithUserSchema> {}
