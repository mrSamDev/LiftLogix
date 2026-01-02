import { Hono } from "hono";
import { authMiddleware, type AuthVariables } from "@src/middleware/auth";
import { corsMiddleware } from "@src/middleware/cors";
import routes from "./routes";

const app = new Hono<{ Variables: AuthVariables }>();

app.use("*", corsMiddleware);

app.use(async (c, next) => {
  console.log(`[${c.req.method}] ${c.req.url}`);
  await next();
});

app.use("*", authMiddleware);

app.route("/", routes);

export default app;
