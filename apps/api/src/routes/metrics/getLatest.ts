import { Hono } from "hono";
import { transformMetricToApi } from "@lift-logic/types";
import { safetry } from "@lift-logic/utils";
import mongoose from "mongoose";
import type { AuthVariables } from "@src/middleware/auth";

const app = new Hono<{ Variables: AuthVariables }>();

export default app.get("/latest", async (c) => {
  const user = c.get("user");

  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const db = mongoose.connection.db;

  if (!db) {
    return c.json({ error: "Database not connected" }, 500);
  }

  const [error, metric] = await safetry(
    db.collection("metrics").findOne({ userId: user._id }, { sort: { recordedAt: -1 } })
  );

  if (error) {
    return c.json(
      {
        error: "Failed to fetch latest metric",
        message: error.message,
      },
      400
    );
  }

  if (!metric) {
    return c.json({ metric: null });
  }

  return c.json({ metric: transformMetricToApi(metric) });
});
