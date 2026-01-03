import { Hono } from "hono";
import { safetry } from "@lift-logic/utils";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const app = new Hono();

export default app.get("/:id", async (c) => {
  const id = c.req.param("id");
  const db = mongoose.connection.db;

  if (!db) {
    return c.json(
      {
        error: "Database not connected",
      },
      500
    );
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
    return c.json(
      {
        error: "Exercise not found",
      },
      404
    );
  }

  return c.json(exercise, 200);
});
