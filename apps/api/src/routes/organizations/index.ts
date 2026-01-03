import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { OrganizationInputSchema } from "@lift-logic/types";
import { adminMiddleware } from "@src/middleware/admin";
import * as organizationController from "@src/controllers/organizations";

const organizations = new Hono();

organizations.use("/organizations/*", adminMiddleware);
organizations.get("/organizations", organizationController.getOrganizations);
organizations.get("/organizations/:id", organizationController.getOrganizationById);
organizations.post("/organizations", zValidator("json", OrganizationInputSchema), organizationController.createOrganization);

export default organizations;
