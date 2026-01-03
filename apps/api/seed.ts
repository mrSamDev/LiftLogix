import { connectDatabase, disconnectDatabase } from "@src/db";
import { createAuth } from "@src/auth";
import mongoose from "mongoose";

const seedUsers = [
  {
    email: "admin@liftlogic.com",
    password: "Admin123!",
    name: "Admin User",
    role: "admin",
  },
  {
    email: "user@liftlogic.com",
    password: "User123!",
    name: "Regular User",
    role: "user",
  },
  {
    email: "coach@liftlogic.com",
    password: "Coach123!",
    name: "Coach User",
    role: "coach",
  },
];

async function seed() {
  await connectDatabase();

  const auth = createAuth();
  const db = mongoose.connection.db;

  if (!db) {
    throw new Error("Database connection not established");
  }

  const userCollection = db.collection("user");
  const accountCollection = db.collection("account");

  await userCollection.deleteMany({
    email: { $in: seedUsers.map((u) => u.email) },
  });

  console.log("Seeding users...");

  for (const userData of seedUsers) {
    const existingUser = await userCollection.findOne({ email: userData.email });

    if (existingUser) {
      console.log(`User ${userData.email} already exists, skipping...`);
      continue;
    }

    const result = await auth.api.signUpEmail({
      body: {
        email: userData.email,
        password: userData.password,
        name: userData.name,
        role: userData.role,
      },
    });

    if (result) {
      console.log(`Created ${userData.role} user: ${userData.email}`);
    }
  }

  console.log("\nSeed complete!");
  console.log("\nLogin credentials:");
  seedUsers.forEach((user) => {
    console.log(`\n${user.role.toUpperCase()}:`);
    console.log(`  Email: ${user.email}`);
    console.log(`  Password: ${user.password}`);
  });

  await disconnectDatabase();
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
