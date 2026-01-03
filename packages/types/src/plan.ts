import { z } from "zod";

export const PlanExerciseSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Exercise name is required"),
  sets: z.number().int().positive("Sets must be positive"),
  reps: z.number().int().positive("Reps must be positive"),
  weight: z.number().nonnegative("Weight cannot be negative"),
  restTime: z.number().int().nonnegative("Rest time cannot be negative"),
  notes: z.string().optional(),
});

export interface PlanExercise extends z.infer<typeof PlanExerciseSchema> {}

export const CreatePlanInputSchema = z.object({
  clientId: z.string().min(1, "Client ID is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  exercises: z.array(PlanExerciseSchema).min(1, "At least one exercise is required"),
  isPublic: z.boolean().default(false),
  planNotes: z.string().optional(),
  scheduledDate: z.string().optional(),
});

export interface CreatePlanInput extends z.infer<typeof CreatePlanInputSchema> {}

export const UpdatePlanInputSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().optional(),
  exercises: z.array(PlanExerciseSchema).optional(),
  isPublic: z.boolean().optional(),
  planNotes: z.string().optional(),
  scheduledDate: z.string().optional(),
});

export interface UpdatePlanInput extends z.infer<typeof UpdatePlanInputSchema> {}

export const PlanSchema = z.object({
  id: z.string(),
  clientId: z.string(),
  coachId: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  exercises: z.array(PlanExerciseSchema),
  isPublic: z.boolean(),
  planNotes: z.string().optional(),
  scheduledDate: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export interface Plan extends z.infer<typeof PlanSchema> {}

export const ApiPlanSchema = z.object({
  _id: z.string(),
  clientId: z.string(),
  coachId: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  exercises: z.array(PlanExerciseSchema),
  isPublic: z.boolean(),
  planNotes: z.string().optional(),
  scheduledDate: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export interface ApiPlan extends z.infer<typeof ApiPlanSchema> {}
