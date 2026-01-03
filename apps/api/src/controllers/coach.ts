import type { Context } from "hono";
import { safetry } from "@lift-logic/utils";
import mongoose from "mongoose";
import type { AuthVariables } from "@src/middleware/auth";
import { ObjectId } from "mongodb";

export async function getDashboard(c: Context<{ Variables: AuthVariables }>) {
  const db = mongoose.connection.db;
  const user = c.get("user");

  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  if (!db) {
    return c.json({ error: "Database not connected" }, 500);
  }

  const coachId = user.id;

  if (!coachId) {
    return c.json({ error: "Invalid coach ID" }, 400);
  }

  const [error, result] = await safetry(Promise.all([db.collection("user").countDocuments({ coachId }), db.collection("user").countDocuments({ coachId, isActive: true })]));

  if (error) {
    return c.json(
      {
        error: "Failed to fetch client counts",
        message: error.message,
      },
      500
    );
  }

  const [totalClients, activeClients] = result;

  return c.json({ activeClients, totalClients }, 200);
}

export async function getClients(c: Context<{ Variables: AuthVariables }>) {
  const db = mongoose.connection.db;
  const user = c.get("user");

  if (!user?.id) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const isCoach = user.role === "coach";

  if (!isCoach) {
    return c.json({ error: "Forbidden" }, 403);
  }

  if (!db) {
    return c.json({ error: "Database not connected" }, 500);
  }

  const coachId = user.id;

  const clientsList = await db
    .collection("user")
    .find(
      { coachId },
      {
        projection: {
          _id: 1,
          name: 1,
          email: 1,
          status: 1,
          createdAt: 1,
        },
      }
    )
    .toArray();

  const formattedClients = clientsList.map((client) => ({
    id: client._id.toString(),
    name: client.name || "Unknown",
    email: client.email,
    status: client.status || "inactive",
    joinedAt: client.createdAt.toISOString(),
  }));

  return c.json({ clients: formattedClients });
}

export async function getPlanByCoachAndClient(c: Context) {
  const user = c.get("user");

  const clientId = c.req.param("clientId");

  const coachId = user?.id;

  const db = mongoose.connection.db;

  if (!db) {
    return c.json({ error: "Database not connected" }, 500);
  }

  const [error, plans] = await safetry(db.collection("plans").find({ coachId: coachId, clientId: clientId }).toArray());

  if (error) {
    return c.json(
      {
        error: "Failed to fetch plans",
        message: error.message,
      },
      500
    );
  }

  if (!plans || plans.length === 0) {
    return c.json({ error: "Plans not found" }, 404);
  }

  return c.json(plans, 200);
}
