import { Hono } from "hono";
import { safetry } from "@lift-logic/utils";
import mongoose from "mongoose";

const app = new Hono();

export default app.get("/", async (c) => {
  const db = mongoose.connection.db;

  if (!db) {
    return c.json(
      {
        error: "Database not connected",
      },
      500
    );
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
});
