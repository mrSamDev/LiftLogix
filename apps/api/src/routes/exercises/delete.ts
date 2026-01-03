import { Hono } from "hono";
import { safetry } from "@lift-logic/utils";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const app = new Hono();

export default app.delete("/:id", async (c) => {
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
    return c.json(
      {
        error: "Exercise not found",
      },
      404
    );
  }

  return c.json({ success: true, message: "Exercise deleted" }, 200);
});
