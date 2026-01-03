import { Hono } from "hono";
import { authMiddleware } from "@src/middleware/auth";
import * as homeController from "@src/controllers/home";

const home = new Hono();

home.use("/*", authMiddleware);
home.get("/home", homeController.getUserHomeData);

export default home;
