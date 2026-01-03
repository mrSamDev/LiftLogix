import { Hono } from "hono";
import { authMiddleware } from "@src/middleware/auth";
import * as coachController from "@src/controllers/coach";

const coach = new Hono();

coach.use("/*", authMiddleware);
coach.get("/dashboard", coachController.getDashboard);
coach.get("/clients", coachController.getClients);
coach.get("/clients/:clientId/plans", coachController.getPlanByCoachAndClient);

export default coach;
