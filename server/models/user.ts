import type { User } from "~~/types";

// Fake users data
const users: User[] = [
  {
    id: "32e6699c-503a-4093-adaa-ee99cfc1abe2",
    name: "Admin",
    email: "admin@email.com",
    password: "$2y$10$hXPea83sKsVsuf95mtEZZeIYtcFl1vLJ1BXVTEqcgKArf6/5.Zksm",
    roles: ["ADMIN"],
  },
  {
    id: "5e992766-2f59-48e3-a7e7-e902be6ec6ca",
    name: "User 1",
    email: "user1@email.com",
    password: "$2y$10$hXPea83sKsVsuf95mtEZZeIYtcFl1vLJ1BXVTEqcgKArf6/5.Zksm",
    roles: ["USER"],
  },
  {
    id: "774ec4ea-e982-4aa3-b94f-fd812913baf6",
    name: "User 2",
    email: "user2@email.com",
    password: "$2y$10$hXPea83sKsVsuf95mtEZZeIYtcFl1vLJ1BXVTEqcgKArf6/5.Zksm",
    roles: ["USER"],
  },
];

export async function getUsers(): Promise<any> {
  return users;
}

export async function getUserByEmail(email: string): Promise<any> {
  return users.find((user) => user.email === email);
}

export async function getUserById(id: string): Promise<any> {
  return users.find((user) => user.id === id);
}

export async function isAdmin(user?: User) {
  return user && user.roles.includes("ADMIN");
}
