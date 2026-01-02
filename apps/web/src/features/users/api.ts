import { fetchApi } from "@lift-logic/utils";
import type { User } from "@lift-logic/types";

const API_BASE = "http://localhost:3000";

export const getUsers = async () => {
  const data = await fetchApi<{ users: User[] }>(`${API_BASE}/api/users`);
  return data.users;
};

export const createUser = async (user: Omit<User, "id">) => {
  return fetchApi<User>(`${API_BASE}/api/users`, {
    method: "POST",
    body: JSON.stringify(user),
  });
};

export const updateUser = async (id: string, updates: Partial<User>) => {
  return fetchApi<User>(`${API_BASE}/api/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updates),
  });
};

export const deleteUser = async (id: string) => {
  return fetchApi<{ success: boolean; message: string }>(
    `${API_BASE}/api/users/${id}`,
    {
      method: "DELETE",
    }
  );
};
