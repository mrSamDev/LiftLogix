import type { Context } from "hono";
import { safetry } from "@lift-logic/utils";
import { getAuth } from "@src/middleware/auth";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

export async function getUsers(c: Context) {
  const db = mongoose.connection.db;
  const user = c.get("user");

  if (!db) {
    return c.json({ error: "Database not connected" }, 500);
  }

  const [error, users] = await safetry(
    db.collection("user").find({ _id: { $ne: user._id } }).limit(100).toArray()
  );

  if (error) {
    return c.json(
      {
        error: "Failed to fetch users",
        message: error.message,
      },
      500
    );
  }

  return c.json({ users }, 200);
}

export async function createUser(c: Context) {
  const data = c.req.valid("json");
  const auth = getAuth();

  const [error, result] = await safetry(
    auth.api.signUpEmail({
      body: {
        name: data.name,
        email: data.email,
        password: "Qwerty#12345",
        role: data.role,
      },
    })
  );

  if (error) {
    return c.json(
      {
        error: "Failed to create user",
        message: error.message,
      },
      400
    );
  }

  return c.json(result, 201);
}

export async function updateUser(c: Context) {
  const userId = c.req.param("id");
  const data = c.req.valid("json");

  if (Object.keys(data).length === 0) {
    return c.json({ error: "At least one field must be provided" }, 400);
  }

  const db = mongoose.connection.db;
  if (!db) {
    return c.json({ error: "Database connection not available" }, 500);
  }

  const [error, result] = await safetry(
    db.collection("user").findOneAndUpdate(
      { _id: new ObjectId(userId) },
      {
        $set: {
          ...data,
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" }
    )
  );

  if (error) {
    return c.json(
      {
        error: "Failed to update user",
        message: error.message,
      },
      400
    );
  }

  if (!result) {
    return c.json({ error: "User not found" }, 404);
  }

  return c.json(result, 200);
}

export async function deleteUser(c: Context) {
  const userId = c.req.param("id");
  const auth = getAuth();

  const [error, result] = await safetry(
    auth.api.deleteUser({
      body: {
        userId,
      },
    })
  );

  if (error) {
    return c.json(
      {
        error: "Failed to delete user",
        message: error.message,
      },
      400
    );
  }

  return c.json({ success: true, message: "User deleted" }, 200);
}
