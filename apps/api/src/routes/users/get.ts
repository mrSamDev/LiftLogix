import { Hono } from "hono";
import { safetry } from "@lift-logic/utils";
import mongoose from "mongoose";

const app = new Hono();

export default app.get("/", async (c) => {
  const db = mongoose.connection.db;
  const user = c.get("user");

  if (!db) {
    return c.json(
      {
        error: "Database not connected",
      },
      500
    );
  }

  const [error, users] = await safetry(
    db.collection("user").find({ _id: { $ne: user._id } }).limit(100).toArray()
  );

  if (error) {
    return c.json(
      {
        error: "Failed to fetch users",
        message: error.message,
      },
      500
    );
  }

  return c.json({ users }, 200);
});
