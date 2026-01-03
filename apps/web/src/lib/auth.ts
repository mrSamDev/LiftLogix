import { createAuthClient } from "better-auth/react";

const API_BASE = "http://localhost:3000";

export const authClient = createAuthClient({
  baseURL: API_BASE,
  fetchOptions: {
    credentials: "include",
  },
});
