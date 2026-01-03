import { z } from "zod";
import { UserRoleSchema } from "./user";

export const CoachProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string().nullable().optional(),
});

export interface CoachProfile extends z.infer<typeof CoachProfileSchema> {}

export const OrganizationProfileSchema = z.object({
  id: z.string(),
  title: z.string(),
  image: z.string(),
  geoLocation: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
});

export interface OrganizationProfile extends z.infer<typeof OrganizationProfileSchema> {}

export const UserHomeDataSchema = z.object({
  user: z.object({
    id: z.string(),
    name: z.string(),
    role: UserRoleSchema,
    unitPreference: z.literal("gram"),
  }),
  organization: OrganizationProfileSchema.nullable(),
  coach: CoachProfileSchema.nullable(),
});

export interface UserHomeData extends z.infer<typeof UserHomeDataSchema> {}
