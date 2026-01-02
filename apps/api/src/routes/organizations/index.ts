import { Hono } from "hono";
import createOrganization from "./create";
import getOrganizations from "./get";
import getOrganizationById from "./getById";

const organizations = new Hono();

organizations.route("/organizations", getOrganizations);
organizations.route("/organizations", createOrganization);
organizations.route("/organizations", getOrganizationById);

export default organizations;
