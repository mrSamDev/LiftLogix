import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { UserMetricInputSchema, transformMetricToApi } from "@lift-logic/types";
import { safetry } from "@lift-logic/utils";
import mongoose from "mongoose";
import type { AuthVariables } from "@src/middleware/auth";

const app = new Hono<{ Variables: AuthVariables }>();

export default app.post("/", zValidator("json", UserMetricInputSchema), async (c) => {
  const user = c.get("user");

  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const data = c.req.valid("json");
  const db = mongoose.connection.db;

  if (!db) {
    return c.json({ error: "Database not connected" }, 500);
  }

  const now = new Date();

  const [insertError, result] = await safetry(
    db.collection("metrics").insertOne({
      userId: user._id,
      weight: data.weight,
      height: data.height,
      bodyFatPercentage: data.bodyFatPercentage,
      notes: data.notes,
      recordedAt: now,
      createdAt: now,
      updatedAt: now,
    })
  );

  if (insertError) {
    return c.json(
      {
        error: "Failed to create metric",
        message: insertError.message,
      },
      400
    );
  }

  const [findError, metric] = await safetry(
    db.collection("metrics").findOne({ _id: result.insertedId })
  );

  if (findError || !metric) {
    return c.json(
      {
        error: "Failed to retrieve created metric",
        message: findError?.message,
      },
      400
    );
  }

  const updateFields: Record<string, unknown> = { updatedAt: now };

  if (data.weight !== undefined) {
    updateFields.currentWeight = data.weight;
  }
  if (data.height !== undefined) {
    updateFields.height = data.height;
  }
  if (data.bodyFatPercentage !== undefined) {
    updateFields.currentBodyFatPercentage = data.bodyFatPercentage;
  }

  await safetry(
    db.collection("user").updateOne({ _id: user._id }, { $set: updateFields })
  );

  return c.json(transformMetricToApi(metric), 201);
});
