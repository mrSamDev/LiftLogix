import { create } from "zustand";
import type { User } from "../features/users";

type StoreState = {
  currentUser: User | null;
  isAuthenticated: boolean;
  setCurrentUser: (user: User | null) => void;
  logout: () => void;
};

export const useStore = create<StoreState>((set) => ({
  currentUser: null,
  isAuthenticated: false,

  setCurrentUser: (user: User | null) => {
    set({ currentUser: user, isAuthenticated: !!user });
  },

  logout: () => {
    set({ currentUser: null, isAuthenticated: false });
  },
}));
