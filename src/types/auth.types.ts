export type RegisterBody = {
  email: string;
  username: string;
  password: string;
  name?: string;
};

export type LoginBody = {
  username: string;
  password: string;
};

export type AuthTokenPayload = {
  userId: number;
  email: string;
};
