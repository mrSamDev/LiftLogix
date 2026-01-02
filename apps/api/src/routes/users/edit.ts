import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { UserUpdateSchema } from "@lift-logic/types";
import { safetry } from "@lift-logic/utils";
import { getAuth } from "@src/middleware/auth";

const app = new Hono();

export default app.patch("/:id", zValidator("json", UserUpdateSchema), async (c) => {
  const userId = c.req.param("id");
  const data = c.req.valid("json");

  if (Object.keys(data).length === 0) {
    return c.json({
      error: "At least one field must be provided"
    }, 400);
  }

  const auth = getAuth();

  const [error, result] = await safetry(
    auth.api.updateUser({
      body: {
        userId,
        ...data,
      },
    })
  );

  if (error) {
    return c.json({
      error: "Failed to update user",
      message: error.message
    }, 400);
  }

  return c.json(result, 200);
});
