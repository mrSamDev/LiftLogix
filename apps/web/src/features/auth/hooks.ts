import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSession, signIn, signOut } from "./api";

const SESSION_QUERY_KEY = ["session"];

export function useSession() {
  return useQuery({
    queryKey: SESSION_QUERY_KEY,
    queryFn: getSession,
  });
}

export function useSignIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => signIn(email, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SESSION_QUERY_KEY });
    },
  });
}

export function useSignOut() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SESSION_QUERY_KEY });
    },
  });
}
