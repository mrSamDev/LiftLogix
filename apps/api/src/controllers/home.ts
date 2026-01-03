import type { Context } from "hono";
import { safetry } from "@lift-logic/utils";
import mongoose from "mongoose";
import type { AuthVariables } from "@src/middleware/auth";
import type { UserHomeData } from "@lift-logic/types";
import { ObjectId } from "mongodb";

export async function getUserHomeData(c: Context<{ Variables: AuthVariables }>) {
  const db = mongoose.connection.db;
  const user = c.get("user");

  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  if (!db) {
    return c.json({ error: "Database not connected" }, 500);
  }

  const userId = user.id;
  const userOrgId = user.orgId;
  const userCoachId = user.coachId;
  console.log("userCoachId: ", userCoachId);

  const queries: Promise<any>[] = [];

  if (userOrgId) {
    queries.push(db.collection("organizations").findOne({ id: userOrgId }));
  } else {
    queries.push(Promise.resolve(null));
  }

  if (userCoachId) {
    queries.push(db.collection("user").findOne({ _id: new ObjectId(userCoachId) }, { projection: { _id: 1, name: 1, image: 1 } }));
  } else {
    queries.push(Promise.resolve(null));
  }

  const [error, results] = await safetry(Promise.all(queries));
  console.log("results: ", results);

  if (error) {
    return c.json(
      {
        error: "Failed to fetch home data",
        message: error.message,
      },
      500
    );
  }

  const [organization, coach] = results;

  const homeData: UserHomeData = {
    user: {
      id: userId,
      name: user.name,
      role: user.role,
      unitPreference: user.unitPreference,
    },
    organization: organization
      ? {
          id: organization.id,
          title: organization.title,
          image: organization.imageUrl,
          geoLocation: organization.geoLocation,
        }
      : null,
    coach: coach
      ? {
          id: coach._id.toString(),
          name: coach.name,
          image: coach.image || null,
        }
      : null,
  };

  return c.json(homeData, 200);
}
