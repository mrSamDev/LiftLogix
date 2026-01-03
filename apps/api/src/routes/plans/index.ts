import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { CreatePlanInputSchema, UpdatePlanInputSchema } from "@lift-logic/types";
import * as planController from "@src/controllers/plans";

const plans = new Hono();

plans.get("/plans", planController.getPlans);
plans.get("/plans/:id", planController.getPlanById);
plans.post("/plans", zValidator("json", CreatePlanInputSchema), planController.createPlan);
plans.put("/plans/:id", zValidator("json", UpdatePlanInputSchema), planController.updatePlan);

export default plans;
