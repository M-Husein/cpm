import type { Project } from "~~/types";

// Fake project data
const projects: Project[] = [
  {
    id: "111111",
    name: "Project 1",
    location: "Indonesia",
    stage: "Concept",
    category: "Education",
    startDate: "2024-08-30T00:26:36.082Z",
    userId: "32e6699c-503a-4093-adaa-ee99cfc1abe2",
    description: "Admin Construction Project 1",
  },
  {
    id: "222222",
    name: "Project 2",
    location: "Indonesia",
    stage: "Design & Documentation",
    category: "Health",
    startDate: "2024-08-29T00:25:30.884Z",
    userId: "5e992766-2f59-48e3-a7e7-e902be6ec6ca",
    description: "My Construction Project 2",
  },
  {
    id: "333333",
    name: "Project 3",
    location: "Indonesia",
    stage: "Pre-Construction",
    category: "Office",
    startDate: "2024-08-29T00:25:30.884Z",
    userId: "5e992766-2f59-48e3-a7e7-e902be6ec6ca",
    description: "The Project 3",
  },
  {
    id: "444444",
    name: "Project 4",
    location: "Indonesia",
    stage: "Construction",
    category: "Sport",
    startDate: "2024-08-28T00:25:30.884Z",
    userId: "774ec4ea-e982-4aa3-b94f-fd812913baf6",
    description: "My Project 4",
  },
  {
    id: "555555",
    name: "Project 5",
    location: "Indonesia",
    stage: "Concept",
    category: "Education",
    startDate: "2024-08-28T00:25:30.884Z",
    userId: "774ec4ea-e982-4aa3-b94f-fd812913baf6",
    description: "The Construction Project 5",
  },
];

export async function getProjects() {
  return projects;
}

export async function getProjectById(id: string) {
  return projects.find((item) => item.id === id);
}

export async function getProjectByName(name: string) {
  return projects.find((item) => item.name === name);
}
