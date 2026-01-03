import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { UserInputSchema, UserUpdateSchema } from "@lift-logic/types";
import { adminMiddleware } from "@src/middleware/admin";
import * as userController from "@src/controllers/users";

const users = new Hono();

users.use("/users/*", adminMiddleware);
users.get("/users", userController.getUsers);
users.post("/users", zValidator("json", UserInputSchema), userController.createUser);
users.patch("/users/:id", zValidator("json", UserUpdateSchema), userController.updateUser);
users.delete("/users/:id", userController.deleteUser);

export default users;
