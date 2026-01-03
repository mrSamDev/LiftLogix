import { Hono } from "hono";
import dashboard from "./dashboard";
import clients from "./clients";
import { authMiddleware } from "@src/middleware/auth";

const coach = new Hono();

coach.use("/*", authMiddleware);
coach.route("/", dashboard);
coach.route("/clients", clients);

export default coach;
