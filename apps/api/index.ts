import { safetry } from "@lift-logic/utils";
import app from "@src/server";
import { connectDatabase } from "@src/db";
import { initializeAuth } from "@src/middleware/auth";

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

async function startServer() {
  await connectDatabase();
  initializeAuth();

  Bun.serve({
    fetch: app.fetch,
    hostname: "0.0.0.0",
    port: PORT,
  });

  console.log(`Server is running on http://localhost:${PORT}`);
}

async function main() {
  const [error] = await safetry(startServer());

  if (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

main();
