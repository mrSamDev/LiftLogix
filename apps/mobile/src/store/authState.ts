import { create } from "zustand";
import { getToken, getUserData, setUserData } from "../lib/auth";
import type { User } from "@lift-logic/types";

type AuthState = {
  isAuthenticated: boolean;
  user?: User;
  actions: {
    setAuthenticated: (value: boolean) => void;
    checkAuth: () => Promise<void>;
    setUser: (user?: User) => void;
  };
};

export const useAuthState = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: undefined,
  actions: {
    setAuthenticated: (value) => set({ isAuthenticated: value }),
    checkAuth: async () => {
      const token = await getToken();
      if (token) {
        const user = await getUserData();
        set({ isAuthenticated: true, user: user || undefined });
      } else {
        set({ isAuthenticated: false, user: undefined });
      }
    },
    setUser: async (user?: User) => {
      if (user) {
        await setUserData(user);
      }
      set({ user });
    },
  },
}));
