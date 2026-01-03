import { Context, Hono } from "hono";
import { AuthVariables } from "@src/middleware/auth";
import mongoose from "mongoose";

const clients = new Hono();

clients.get("/", async (c: Context<{ Variables: AuthVariables }>) => {
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
});

export default clients;
