import { Hono } from "hono";
import createExercise from "./create";
import deleteExercise from "./delete";
import getExercises from "./get";
import getExerciseById from "./getById";

const exercises = new Hono();

exercises.route("/exercises", getExercises);
exercises.route("/exercises", getExerciseById);
exercises.route("/exercises", createExercise);
exercises.route("/exercises", deleteExercise);

export default exercises;
