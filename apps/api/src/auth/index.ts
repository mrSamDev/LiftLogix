import { DEFAULT_TRUSTED_ORIGINS, ONE_DAY_IN_SECONDS, SEVEN_DAYS_IN_SECONDS } from "@src/constants";
import { isProduction } from "@src/utils/isProduction";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import type { MongoClient } from "mongodb";
import mongoose from "mongoose";

function getMongoClient(): MongoClient {
  if (mongoose.connection.readyState !== 1) {
    throw new Error("Mongoose must be connected before initializing Better Auth");
  }

  const client = mongoose.connection.getClient() as MongoClient;
  if (!client) {
    throw new Error("Failed to get MongoDB client from mongoose connection");
  }
  return client;
}

function getMongoDb() {
  const client = getMongoClient();
  const dbName = mongoose.connection.db?.databaseName;

  if (!dbName) {
    throw new Error("Failed to get database name from mongoose connection");
  }

  return client.db(dbName);
}

function getTrustedOrigins(): string[] {
  const origins = process.env.ALLOWED_ORIGINS;

  if (!origins) return DEFAULT_TRUSTED_ORIGINS;

  return origins.split(",").map((origin) => origin.trim());
}

export function createAuth() {
  const db = getMongoDb();
  const trustedOrigins = getTrustedOrigins();

  return betterAuth({
    database: mongodbAdapter(db),
    user: {
      additionalFields: {
        role: {
          type: "string",
          required: false,
          defaultValue: "user",
          input: true,
        },
        unitPreference: {
          type: "string",
          required: false,
          defaultValue: "gram",
          input: false,
        },
        isActive: {
          type: "boolean",
          required: false,
          defaultValue: true,
          input: false,
        },
      },
    },

    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },

    session: {
      expiresIn: SEVEN_DAYS_IN_SECONDS,
      updateAge: ONE_DAY_IN_SECONDS,
    },

    secret: process.env.BETTER_AUTH_SECRET || "please-change-this-secret-in-production",
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
    trustedOrigins,

    experimental: {
      joins: true,
    },

    advanced: {
      useSecureCookies: isProduction(),
      crossSubDomainCookies: {
        enabled: false,
      },
      cookieOptions: {
        sameSite: "none",
        secure: isProduction(),
        httpOnly: true,
        path: "/",
      },
    },
  });
}

export type Auth = ReturnType<typeof betterAuth>;
