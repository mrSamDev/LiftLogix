import mongoose from "mongoose";
import { safetry } from "@lift-logic/utils";

export async function connectDatabase(): Promise<void> {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI environment variable is not set");
  }

  const [error] = await safetry(mongoose.connect(mongoUri));

  if (error) {
    throw new Error(`Failed to connect to MongoDB: ${error.message}`);
  }

  console.log("Connected to MongoDB");
}

export async function disconnectDatabase(): Promise<void> {
  const [error] = await safetry(mongoose.disconnect());

  if (error) {
    throw new Error(`Failed to disconnect from MongoDB: ${error.message}`);
  }

  console.log("Disconnected from MongoDB");
}
