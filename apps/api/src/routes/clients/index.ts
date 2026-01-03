import { Hono } from "hono";
import { authMiddleware } from "@src/middleware/auth";
import * as clientsController from "@src/controllers/clients";
const clients = new Hono().basePath("/clients");
clients.use("/*", authMiddleware);

clients.get("/workout-list", clientsController.getWorkoutList);

export default clients;
