export type User = {
  id: string;
  email: string;
  password: string;
};

export type SafeUser = Omit<User, "password">;

export type JwtPayload = {
  userId: string;
};
