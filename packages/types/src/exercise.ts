import { z } from "zod";

export const ExerciseSchema = z.object({
  id: z.string(),
  title: z.string(),
  thumbnailUrl: z.string().optional(),
  videoUrl: z.string().optional(),
  description: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export interface Exercise extends z.infer<typeof ExerciseSchema> {}

export const ExerciseInputSchema = z.object({
  title: z.string().min(1, "Title is required"),
  thumbnailUrl: z.string().optional(),
  videoUrl: z.string().optional(),
  description: z.string().min(1, "Description is required"),
});

export interface ExerciseInput extends z.infer<typeof ExerciseInputSchema> {}

export const ApiExerciseSchema = z.object({
  _id: z.string(),
  title: z.string(),
  thumbnailUrl: z.string().optional(),
  videoUrl: z.string().optional(),
  description: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export interface ApiExercise extends z.infer<typeof ApiExerciseSchema> {}
