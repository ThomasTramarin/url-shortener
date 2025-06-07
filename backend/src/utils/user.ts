import { SafeUser, User } from "../types";

export const getSafeUser = (user: User): SafeUser => {
  const { password, ...safeUser } = user;
  return safeUser;
};
