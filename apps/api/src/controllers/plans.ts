import type { Context } from "hono";
import { safetry } from "@lift-logic/utils";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

export async function createPlan(c: Context) {
  const data = c.req.valid("json");

  const db = mongoose.connection.db;

  const user = c.get("user");
  console.log("user: ", user);

  if (!db) {
    return c.json({ error: "Database not connected" }, 500);
  }

  const plan = {
    coachId: user.id,
    clientId: data.clientId,
    title: data.title,
    description: data.description,
    exercises: data.exercises,
    isPublic: data.isPublic,
    planNotes: data.planNotes,
    scheduledDate: data.scheduledDate,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const [error, result] = await safetry(db.collection("plans").insertOne(plan));

  if (error) {
    return c.json(
      {
        error: "Failed to create plan",
        message: error.message,
      },
      400
    );
  }

  return c.json(
    {
      plan: {
        _id: result.insertedId.toString(),
        ...plan,
      },
    },
    201
  );
}

export async function getPlans(c: Context) {
  const db = mongoose.connection.db;

  if (!db) {
    return c.json({ error: "Database not connected" }, 500);
  }

  const [error, plans] = await safetry(db.collection("plans").find({}).limit(100).toArray());

  if (error) {
    return c.json(
      {
        error: "Failed to fetch plans",
        message: error.message,
      },
      500
    );
  }

  return c.json({ plans }, 200);
}

export async function getPlanById(c: Context) {
  const id = c.req.param("id");
  const db = mongoose.connection.db;
  const user = c.get("user");

  if (!db) {
    return c.json({ error: "Database not connected" }, 500);
  }

  const [error, plan] = await safetry(db.collection("plans").findOne({ _id: new ObjectId(id), coachId: user._id }));

  if (error) {
    return c.json(
      {
        error: "Failed to fetch plan",
        message: error.message,
      },
      500
    );
  }

  if (!plan) {
    return c.json({ error: "Plan not found" }, 404);
  }

  return c.json(plan, 200);
}

export async function updatePlan(c: Context) {
  const id = c.req.param("id");
  const data = c.req.valid("json");
  const db = mongoose.connection.db;

  if (!db) {
    return c.json({ error: "Database not connected" }, 500);
  }

  const updates: Record<string, unknown> = {
    updatedAt: new Date().toISOString(),
  };

  if (data.title !== undefined) updates.title = data.title;
  if (data.description !== undefined) updates.description = data.description;
  if (data.exercises !== undefined) updates.exercises = data.exercises;
  if (data.isPublic !== undefined) updates.isPublic = data.isPublic;
  if (data.planNotes !== undefined) updates.planNotes = data.planNotes;
  if (data.scheduledDate !== undefined) updates.scheduledDate = data.scheduledDate;

  const [error, result] = await safetry(db.collection("plans").findOneAndUpdate({ _id: new ObjectId(id) }, { $set: updates }, { returnDocument: "after" }));

  if (error) {
    return c.json(
      {
        error: "Failed to update plan",
        message: error.message,
      },
      400
    );
  }

  if (!result) {
    return c.json({ error: "Plan not found" }, 404);
  }

  return c.json(result, 200);
}
