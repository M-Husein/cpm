import { getProjects } from "~~/server/models/project";

export default defineEventHandler(async () => {
  return await getProjects();
});
