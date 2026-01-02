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

  const [error, organizations] = await safetry(
    db.collection("organizations").find({}).limit(100).toArray()
  );

  if (error) {
    return c.json(
      {
        error: "Failed to fetch organizations",
        message: error.message,
      },
      500
    );
  }

  const formattedOrganizations = organizations.map((org: any) => ({
    id: org.id,
    title: org.title,
    imageUrl: org.imageUrl,
    geoLocation: org.geoLocation,
  }));

  return c.json({ organizations: formattedOrganizations }, 200);
});
