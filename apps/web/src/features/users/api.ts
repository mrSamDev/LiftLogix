import { fetchApi, safetry } from "@lift-logic/utils";
import type { UserInput, UserUpdate, ApiUser } from "@lift-logic/types";
import { userTransformer } from "@lift-logic/types";

const API_BASE = "http://localhost:3000";

export const getUsers = async () => {
  const [fetchError, data] = await safetry(fetchApi<{ users: ApiUser[] }>(`${API_BASE}/api/users`));
  if (fetchError) {
    throw new Error(`Failed to fetch users: ${fetchError.message}`);
  }

  const [transformError, users] = safetry(() => data.users.map(userTransformer.fromAPI));
  console.log("transformError: ", transformError);
  if (transformError) {
    throw new Error(`Failed to transform users: ${transformError.message}`);
  }
  return users;
};

export const createUser = async (user: UserInput) => {
  const [fetchError, apiUser] = await safetry(
    fetchApi<ApiUser>(`${API_BASE}/api/users`, {
      method: "POST",
      body: JSON.stringify(user),
    })
  );
  if (fetchError) {
    throw new Error(`Failed to create user: ${fetchError.message}`);
  }

  const [transformError, transformedUser] = safetry(() => userTransformer.fromAPI(apiUser));
  if (transformError) {
    throw new Error(`Failed to transform created user: ${transformError.message}`);
  }
  return transformedUser;
};

export const updateUser = async (id: string, updates: UserUpdate) => {
  const [fetchError, apiUser] = await safetry(
    fetchApi<ApiUser>(`${API_BASE}/api/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    })
  );
  if (fetchError) {
    throw new Error(`Failed to update user ${id}: ${fetchError.message}`);
  }

  const [transformError, transformedUser] = safetry(() => userTransformer.fromAPI(apiUser));
  if (transformError) {
    throw new Error(`Failed to transform updated user ${id}: ${transformError.message}`);
  }
  return transformedUser;
};

export const deleteUser = async (id: string) => {
  const [error, result] = await safetry(
    fetchApi<{ success: boolean; message: string }>(`${API_BASE}/api/users/${id}`, {
      method: "DELETE",
    })
  );
  if (error) {
    throw new Error(`Failed to delete user ${id}: ${error.message}`);
  }
  return result;
};
