import { Hono } from "hono";
import type { Context } from "hono";
import authroute from "@src/routes/auth";

const routes = new Hono();

routes.get("/", (c: Context) => c.text("Hono! how are you?"));

routes.get("/health", (c: Context) => c.json({ status: "ok" }));

routes.route("/", authroute);

export default routes;
