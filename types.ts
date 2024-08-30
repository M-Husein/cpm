export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  roles: string[];
}

export type UserWithoutPassword = Omit<User, "password">;

export interface Project {
  id: string;
  name: string;
  location: string;
  stage: string;
  category: string;
  startDate: string;
  description: string;
  userId: string;
}
