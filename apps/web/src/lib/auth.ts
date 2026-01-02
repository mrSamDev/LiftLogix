import { createAuthClient } from "better-auth/react";

const API_BASE = "http://localhost:3000";
console.log("API_BASE: ", API_BASE);

export const authClient = createAuthClient({
  baseURL: API_BASE,
  fetchOptions: {
    credentials: "include",
  },
});
