import { Hono } from "hono";
import { cors } from "hono/cors";
import type { Context } from "hono";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: "http://localhost:3000",
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.get("/", (c: Context) => c.text("Hono!"));

export default app;
