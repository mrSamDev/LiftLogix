import { getAuth } from "@src/middleware/auth";
import { Hono } from "hono";

const routes = new Hono();

routes.on(["POST", "GET"], "/api/auth/*", (c) => getAuth().handler(c.req.raw));

export default routes;
