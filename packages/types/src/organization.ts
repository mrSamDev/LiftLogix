import { z } from "zod";

export const OrganizationSchema = z.object({
  id: z.string(),
  title: z.string(),
  imageUrl: z.string(),
  geoLocation: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export interface Organization extends z.infer<typeof OrganizationSchema> {}

export const OrganizationInputSchema = z.object({
  title: z.string().min(1, "Title is required"),
  imageUrl: z.string().url("Invalid image URL"),
  geoLocation: z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
  }),
});

export interface OrganizationInput extends z.infer<typeof OrganizationInputSchema> {}

export const OrganizationUpdateSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  imageUrl: z.string().url("Invalid image URL").optional(),
  geoLocation: z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
  }).optional(),
});

export interface OrganizationUpdate extends z.infer<typeof OrganizationUpdateSchema> {}
