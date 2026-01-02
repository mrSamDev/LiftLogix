import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/api/auth/api";
import type { LoginFormData } from "@/api/auth/transformer";

export function useSignIn() {
  return useMutation({
    mutationFn: (values: LoginFormData) => signIn(values),
  });
}
