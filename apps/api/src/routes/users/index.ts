import { Hono } from "hono";
import { adminMiddleware } from "@src/middleware/admin";
import createUser from "./create";
import editUser from "./edit";
import deleteUser from "./delete";
import getUsers from "./get";

const users = new Hono();

users.use("/users/*", adminMiddleware);
users.route("/users", getUsers);
users.route("/users", createUser);
users.route("/users", editUser);
users.route("/users", deleteUser);

export default users;
