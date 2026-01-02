import { fetchApi } from "@lift-logic/utils";
import type { User, UserInput, UserUpdate } from "@lift-logic/types";

const API_BASE = "http://localhost:3000";

export const getUsers = async () => {
  const data = await fetchApi<{ users: User[] }>(`${API_BASE}/api/users`);
  return data.users;
};

export const createUser = async (user: UserInput) => {
  return fetchApi<User>(`${API_BASE}/api/users`, {
    method: "POST",
    body: JSON.stringify(user),
  });
};

export const updateUser = async (id: string, updates: UserUpdate) => {
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
