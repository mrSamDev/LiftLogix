import { authClient } from "@/lib/auth";
import type { SessionWithUser } from "@lift-logic/types";
import { authTransformer, type LoginFormData } from "./transformer";

export const getSessionInfo = async () => {
  const { data } = await authClient.getSession();
  return data as SessionWithUser | null;
};

export const signIn = async (values: LoginFormData) => {
  const apiPayload = authTransformer.toAPI(values);
  const response = await authClient.signIn.email(apiPayload);
  return authTransformer.fromAPI(response);
};
