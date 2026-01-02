import { Hono } from "hono";
import { safetry } from "@lift-logic/utils";
import mongoose from "mongoose";

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

  const [error, organization] = await safetry(
    db.collection("organizations").findOne({ id })
  );

  if (error) {
    return c.json(
      {
        error: "Failed to fetch organization",
        message: error.message,
      },
      500
    );
  }

  if (!organization) {
    return c.json(
      {
        error: "Organization not found",
      },
      404
    );
  }

  return c.json(
    {
      id: organization.id,
      title: organization.title,
      imageUrl: organization.imageUrl,
      geoLocation: organization.geoLocation,
    },
    200
  );
});
