import type { Organization, User } from "../types/domain";

export const MOCK_ORGANIZATIONS: Organization[] = [
  {
    id: "org_1",
    title: "Demo Fitness Org",
    imageUrl: "https://placehold.co/600x400",
    geoLocation: {
      latitude: 12.9716,
      longitude: 77.5946,
    },
  },
];

export const MOCK_USERS: User[] = [
  {
    id: "admin_1",
    name: "Admin User",
    email: "admin@demo.com",
    role: "admin",
    organizationId: "org_1",
    coachId: null,
  },
  {
    id: "coach_1",
    name: "Coach John",
    email: "coach@demo.com",
    role: "coach",
    organizationId: "org_1",
    coachId: null,
  },
  {
    id: "user_1",
    name: "User One",
    email: "user1@demo.com",
    role: "user",
    organizationId: "org_1",
    coachId: "coach_1",
  },
  {
    id: "user_2",
    name: "User Two",
    email: "user2@demo.com",
    role: "user",
    organizationId: "org_1",
    coachId: "coach_1",
  },
];
