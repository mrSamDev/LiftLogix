import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";
import type { User } from "@lift-logic/types";

import { API_URL } from "../config";
import isProduction from "../utils/isProduction";

const TOKEN_KEY = "auth_access_token";
const USER_DATA_KEY = "auth_user_data";

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

export async function setUserData(user: User): Promise<void> {
  await SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(user));
}

export async function getUserData(): Promise<User | null> {
  const data = await SecureStore.getItemAsync(USER_DATA_KEY);
  return data ? JSON.parse(data) : null;
}

export async function removeUserData(): Promise<void> {
  await SecureStore.deleteItemAsync(USER_DATA_KEY);
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
