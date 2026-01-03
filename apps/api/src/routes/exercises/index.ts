import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { ExerciseInputSchema } from "@lift-logic/types";
import * as exerciseController from "@src/controllers/exercises";

const exercises = new Hono();

exercises.get("/exercises", exerciseController.getExercises);
exercises.get("/exercises/:id", exerciseController.getExerciseById);
exercises.post("/exercises", zValidator("json", ExerciseInputSchema), exerciseController.createExercise);
exercises.delete("/exercises/:id", exerciseController.deleteExercise);

export default exercises;
