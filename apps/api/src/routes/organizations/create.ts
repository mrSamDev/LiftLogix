import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { OrganizationInputSchema } from "@lift-logic/types";
import { safetry } from "@lift-logic/utils";
import mongoose from "mongoose";

const app = new Hono();

export default app.post("/", zValidator("json", OrganizationInputSchema), async (c) => {
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

  const organizationData = {
    id: new mongoose.Types.ObjectId().toString(),
    title: data.title,
    imageUrl: data.imageUrl,
    geoLocation: {
      latitude: data.geoLocation.latitude,
      longitude: data.geoLocation.longitude,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const [error, result] = await safetry(
    db.collection("organizations").insertOne(organizationData)
  );

  if (error) {
    return c.json(
      {
        error: "Failed to create organization",
        message: error.message,
      },
      400
    );
  }

  return c.json(
    {
      id: organizationData.id,
      title: organizationData.title,
      imageUrl: organizationData.imageUrl,
      geoLocation: organizationData.geoLocation,
    },
    201
  );
});
