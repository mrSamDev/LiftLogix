import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { UserUpdateSchema } from "@lift-logic/types";
import { safetry } from "@lift-logic/utils";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const app = new Hono();

export default app.patch("/:id", zValidator("json", UserUpdateSchema), async (c) => {
  const userId = c.req.param("id");
  const data = c.req.valid("json");

  if (Object.keys(data).length === 0) {
    return c.json({
      error: "At least one field must be provided"
    }, 400);
  }

  const db = mongoose.connection.db;
  if (!db) {
    return c.json({
      error: "Database connection not available"
    }, 500);
  }

  const [error, result] = await safetry(
    db.collection("user").findOneAndUpdate(
      { _id: new ObjectId(userId) },
      {
        $set: {
          ...data,
          updatedAt: new Date()
        }
      },
      { returnDocument: "after" }
    )
  );

  if (error) {
    return c.json({
      error: "Failed to update user",
      message: error.message
    }, 400);
  }

  if (!result) {
    return c.json({
      error: "User not found"
    }, 404);
  }

  return c.json(result, 200);
});
