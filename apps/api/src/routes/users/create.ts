import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { UserInputSchema } from "@lift-logic/types";
import { safetry } from "@lift-logic/utils";
import { getAuth } from "@src/middleware/auth";

const app = new Hono();

export default app.post("/", zValidator("json", UserInputSchema), async (c) => {
  const data = c.req.valid("json");
  const auth = getAuth();

  const [error, result] = await safetry(
    auth.api.signUpEmail({
      body: {
        name: data.name,
        email: data.email,
        password: "Qwerty#12345",
        role: data.role,
      },
    })
  );

  if (error) {
    return c.json(
      {
        error: "Failed to create user",
        message: error.message,
      },
      400
    );
  }

  return c.json(result, 201);
});
