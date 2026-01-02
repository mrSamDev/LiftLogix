import { create } from "zustand";
import type { Organization } from "../types/domain";
import type { User } from "../features/users";
import { MOCK_ORGANIZATIONS } from "./mockData";

type StoreState = {
  organizations: Organization[];
  currentUser: User | null;
  isAuthenticated: boolean;
  setCurrentUser: (user: User | null) => void;
  logout: () => void;
  addOrganization: (org: Organization) => void;
  updateOrganization: (id: string, updates: Partial<Organization>) => void;
  getOrganizationById: (id: string) => Organization | null;
};

export const useStore = create<StoreState>((set, get) => ({
  organizations: [...MOCK_ORGANIZATIONS],
  currentUser: null,
  isAuthenticated: false,

  setCurrentUser: (user: User | null) => {
    set({ currentUser: user, isAuthenticated: !!user });
  },

  logout: () => {
    set({ currentUser: null, isAuthenticated: false });
  },

  addOrganization: (org: Organization) => {
    set((state) => ({
      organizations: [...state.organizations, org],
    }));
  },

  updateOrganization: (id: string, updates: Partial<Organization>) => {
    set((state) => ({
      organizations: state.organizations.map((org) =>
        org.id === id ? { ...org, ...updates } : org
      ),
    }));
  },

  getOrganizationById: (id: string) => {
    return get().organizations.find((org) => org.id === id) || null;
  },
}));
