import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

import { API_URL } from "../config";
import isProduction from "../utils/isProduction";

const TOKEN_KEY = "auth_access_token";

const PROD_ORIGIN = "https://app.yourdomain.com";

export async function setToken(token: string): Promise<void> {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function getToken(): Promise<string | null> {
  return await SecureStore.getItemAsync(TOKEN_KEY);
}

export async function removeToken(): Promise<void> {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}

export const authClient = createAuthClient({
  baseURL: API_URL,
  fetchOptions: {
    credentials: "include",
    async customFetchImpl(url, options) {
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

      // headers.set("Origin", "https://app.yourdomain.com");

      return fetch(url, {
        ...options,
        headers,
      });
    },
  },
});
