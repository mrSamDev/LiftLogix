import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ExerciseInputSchema } from "@lift-logic/types";
import { safetry } from "@lift-logic/utils";
import mongoose from "mongoose";

const app = new Hono();

export default app.post("/", zValidator("json", ExerciseInputSchema), async (c) => {
  const data = c.req.valid("json");
  const db = mongoose.connection.db;

  if (!db) {
    return c.json(
      {
        error: "Database not connected",
      },
      500
    );
  }

  const exercise = {
    title: data.title,
    thumbnail_url: data.thumbnailUrl,
    video_url: data.videoUrl,
    description: data.description,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const [error, result] = await safetry(db.collection("exercises").insertOne(exercise));

  if (error) {
    return c.json(
      {
        error: "Failed to create exercise",
        message: error.message,
      },
      400
    );
  }

  return c.json(
    {
      id: result.insertedId.toString(),
      ...exercise,
    },
    201
  );
});
