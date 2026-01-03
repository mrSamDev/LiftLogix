import type { Context } from "hono";
import { safetry } from "@lift-logic/utils";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

export async function getExercises(c: Context) {
  const db = mongoose.connection.db;

  if (!db) {
    return c.json({ error: "Database not connected" }, 500);
  }

  const [error, exercises] = await safetry(
    db.collection("exercises").find({}).limit(100).toArray()
  );

  if (error) {
    return c.json(
      {
        error: "Failed to fetch exercises",
        message: error.message,
      },
      500
    );
  }

  return c.json({ exercises }, 200);
}

export async function getExerciseById(c: Context) {
  const id = c.req.param("id");
  const db = mongoose.connection.db;

  if (!db) {
    return c.json({ error: "Database not connected" }, 500);
  }

  const [error, exercise] = await safetry(
    db.collection("exercises").findOne({ _id: new ObjectId(id) })
  );

  if (error) {
    return c.json(
      {
        error: "Failed to fetch exercise",
        message: error.message,
      },
      500
    );
  }

  if (!exercise) {
    return c.json({ error: "Exercise not found" }, 404);
  }

  return c.json(exercise, 200);
}

export async function createExercise(c: Context) {
  const data = c.req.valid("json");
  const db = mongoose.connection.db;

  if (!db) {
    return c.json({ error: "Database not connected" }, 500);
  }

  const exercise = {
    title: data.title,
    thumbnailUrl: data.thumbnailUrl,
    videoUrl: data.videoUrl,
    description: data.description,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
}

export async function deleteExercise(c: Context) {
  const id = c.req.param("id");
  const db = mongoose.connection.db;

  if (!db) {
    return c.json({ error: "Database not connected" }, 500);
  }

  const [error, result] = await safetry(
    db.collection("exercises").deleteOne({ _id: new ObjectId(id) })
  );

  if (error) {
    return c.json(
      {
        error: "Failed to delete exercise",
        message: error.message,
      },
      400
    );
  }

  if (result.deletedCount === 0) {
    return c.json({ error: "Exercise not found" }, 404);
  }

  return c.json({ success: true, message: "Exercise deleted" }, 200);
}
