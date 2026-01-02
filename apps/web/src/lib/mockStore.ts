import { create } from "zustand";
import type { Organization, User } from "../types/domain";
import { MOCK_ORGANIZATIONS, MOCK_USERS } from "./mockData";

type StoreState = {
  organizations: Organization[];
  users: User[];
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string) => User | null;
  logout: () => void;
  addOrganization: (org: Organization) => void;
  updateOrganization: (id: string, updates: Partial<Organization>) => void;
  addUser: (user: User) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  getUsersByCoachId: (coachId: string) => User[];
  getCoaches: () => User[];
  getOrganizationById: (id: string) => Organization | null;
  getUsersByOrganizationId: (organizationId: string) => User[];
  getCoachesByOrganizationId: (organizationId: string) => User[];
};

export const useStore = create<StoreState>((set, get) => ({
  organizations: [...MOCK_ORGANIZATIONS],
  users: [...MOCK_USERS],
  currentUser: MOCK_USERS[0],
  isAuthenticated: true,

  login: (email: string) => {
    const user = get().users.find((u) => u.email === email);
    if (user) {
      set({ currentUser: user, isAuthenticated: true });
      return user;
    }
    return null;
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

  addUser: (user: User) => {
    set((state) => ({
      users: [...state.users, user],
    }));
  },

  updateUser: (id: string, updates: Partial<User>) => {
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? { ...user, ...updates } : user
      ),
    }));
  },

  getUsersByCoachId: (coachId: string) => {
    return get().users.filter((user) => user.coachId === coachId);
  },

  getCoaches: () => {
    return get().users.filter((user) => user.role === "coach");
  },

  getOrganizationById: (id: string) => {
    return get().organizations.find((org) => org.id === id) || null;
  },

  getUsersByOrganizationId: (organizationId: string) => {
    return get().users.filter(
      (user) => user.organizationId === organizationId && user.role === "user"
    );
  },

  getCoachesByOrganizationId: (organizationId: string) => {
    return get().users.filter(
      (user) => user.organizationId === organizationId && user.role === "coach"
    );
  },
}));
