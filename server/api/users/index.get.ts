import { getUsers, isAdmin } from "~~/server/models/user";
import type { User } from "~~/types";

export default defineEventHandler(async (evt) => {
  if (!isAdmin(evt.context.user)) {
    throw createError({
      statusCode: 401,
      message: "You don't have the rights to access this resource",
    });
  }

  const users = await getUsers();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return users.map(({ password, ...etc }: User) => etc);
});
