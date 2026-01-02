import type { SessionWithUser } from "@lift-logic/types";

export type LoginFormData = {
  email: string;
  password: string;
};

export type LoginResponse = {
  session: SessionWithUser;
  user: {
    id: string;
    email: string;
    name: string;
    role: "coach" | "admin" | "user";
  };
};

export const authTransformer = {
  fromAPI(apiData: unknown): LoginResponse {
    const data = apiData as { data?: SessionWithUser };

    if (!data.data) {
      throw new Error("Invalid response from server");
    }

    return {
      session: data.data,
      user: {
        id: data.data.user.id,
        email: data.data.user.email,
        name: data.data.user.name,
        role: data.data.user.role,
      },
    };
  },

  toAPI(formData: LoginFormData) {
    return {
      email: formData.email,
      password: formData.password,
    };
  },
};
