import { Hono } from "hono";
import type { Context } from "hono";
import authroute from "@src/routes/auth";
import usersroute from "@src/routes/users";
import organizationsroute from "@src/routes/organizations";
import coachroute from "@src/routes/coach";
import exercisesroute from "@src/routes/exercises";
import plansroute from "@src/routes/plans";
import clientsroute from "@src/routes/clients";
import homeroute from "@src/routes/home";

const routes = new Hono({}).basePath("/api");

routes.get("/", (c: Context) => c.text("Hono! how are you?"));

routes.get("/health", (c: Context) => c.json({ status: "ok" }));

routes.route("/", authroute);
routes.route("/", usersroute);
routes.route("/", organizationsroute);
routes.route("/coach", coachroute);
routes.route("/", exercisesroute);
routes.route("/", plansroute);
routes.route("/", clientsroute);
routes.route("/", homeroute);

export default routes;
