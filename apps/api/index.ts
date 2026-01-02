import app from "@src/server";

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

Bun.serve({
  fetch: app.fetch,
  hostname: "0.0.0.0",
  port: PORT,
});

console.log(`Server is running on http://localhost:${PORT}`);
