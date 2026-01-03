import { getToken } from "./auth";
import { API_URL } from "../config";
import isProduction from "../utils/isProduction";

const PROD_ORIGIN = "https://app.yourdomain.com";

export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = await getToken();
  const headers = new Headers(options?.headers);

  if (isProduction) {
    headers.set("Origin", PROD_ORIGIN);
  } else {
    headers.set("Origin", "http://localhost");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  console.log("`${API_URL}${endpoint}`: ", `${API_URL}/api${endpoint}`);

  const response = await fetch(`${API_URL}/api${endpoint}`, {
    ...options,
    headers,
    credentials: "include",
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    console.log("errorBody: ", errorBody);
    const errorMessage = errorBody.error || errorBody.message || response.statusText || "Unknown error";
    throw new Error(errorMessage);
  }

  return response.json() as T;
}
