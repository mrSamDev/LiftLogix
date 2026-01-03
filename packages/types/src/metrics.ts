import { z } from "zod";

export const UserMetricSchema = z.object({
  _id: z.string(),
  userId: z.string(),
  weight: z.number().positive().optional(),
  height: z.number().positive().optional(),
  bodyFatPercentage: z.number().min(0).max(100).optional(),
  notes: z.string().optional(),
  recordedAt: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const UserMetricInputSchema = z.object({
  weight: z.number().positive().optional(),
  height: z.number().positive().optional(),
  bodyFatPercentage: z.number().min(0).max(100).optional(),
  notes: z.string().optional(),
});

export const UserMetricUpdateSchema = UserMetricInputSchema.partial();

export const UserMetricApiResponseSchema = z.object({
  id: z.string(),
  userId: z.string(),
  weight: z.number().positive().optional(),
  height: z.number().positive().optional(),
  bodyFatPercentage: z.number().min(0).max(100).optional(),
  notes: z.string().optional(),
  recordedAt: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type UserMetric = z.infer<typeof UserMetricSchema>;
export type UserMetricInput = z.infer<typeof UserMetricInputSchema>;
export type UserMetricUpdate = z.infer<typeof UserMetricUpdateSchema>;
export type UserMetricApiResponse = z.infer<typeof UserMetricApiResponseSchema>;

export function transformMetricToApi(metric: {
  _id: { toString: () => string };
  userId: string;
  weight?: number;
  height?: number;
  bodyFatPercentage?: number;
  notes?: string;
  recordedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}): UserMetricApiResponse {
  return {
    id: metric._id.toString(),
    userId: metric.userId,
    weight: metric.weight,
    height: metric.height,
    bodyFatPercentage: metric.bodyFatPercentage,
    notes: metric.notes,
    recordedAt: metric.recordedAt.toISOString(),
    createdAt: metric.createdAt.toISOString(),
    updatedAt: metric.updatedAt.toISOString(),
  };
}
