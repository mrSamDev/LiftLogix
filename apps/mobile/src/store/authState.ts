import { create } from "zustand";

import { getToken } from "../lib/auth";

type AuthState = {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  checkAuth: () => Promise<void>;
};

export const useAuthState = create<AuthState>((set) => ({
  isAuthenticated: false,
  setAuthenticated: (value) => set({ isAuthenticated: value }),
  checkAuth: async () => {
    const token = await getToken();
    set({ isAuthenticated: !!token });
  },
}));
