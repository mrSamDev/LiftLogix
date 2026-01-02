import { Hono } from "hono";
import type { Context } from "hono";
import authroute from "@src/routes/auth";
import usersroute from "@src/routes/users";

const routes = new Hono({}).basePath("/api");

routes.get("/", (c: Context) => c.text("Hono! how are you?"));

routes.get("/health", (c: Context) => c.json({ status: "ok" }));

routes.route("/", authroute);
routes.route("/", usersroute);

export default routes;
