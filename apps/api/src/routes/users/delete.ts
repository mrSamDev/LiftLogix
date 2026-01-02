import { Hono } from "hono";
import { safetry } from "@lift-logic/utils";
import { getAuth } from "@src/middleware/auth";

const app = new Hono();

export default app.delete("/:id", async (c) => {
  const userId = c.req.param("id");
  const auth = getAuth();

  const [error, result] = await safetry(
    auth.api.deleteUser({
      body: {
        userId,
      },
    })
  );

  if (error) {
    return c.json({
      error: "Failed to delete user",
      message: error.message
    }, 400);
  }

  return c.json({ success: true, message: "User deleted" }, 200);
});
