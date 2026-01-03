import type { Context } from "hono";
import { safetry } from "@lift-logic/utils";
import mongoose from "mongoose";

export async function getOrganizations(c: Context) {
  const db = mongoose.connection.db;

  if (!db) {
    return c.json({ error: "Database not connected" }, 500);
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
}

export async function getOrganizationById(c: Context) {
  const id = c.req.param("id");
  const db = mongoose.connection.db;

  if (!db) {
    return c.json({ error: "Database not connected" }, 500);
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
    return c.json({ error: "Organization not found" }, 404);
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
}

export async function createOrganization(c: Context) {
  const data = c.req.valid("json");
  const db = mongoose.connection.db;

  if (!db) {
    return c.json({ error: "Database not connected" }, 500);
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
}
