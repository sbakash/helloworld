export type Role = "student" | "teacher";

export interface User {
  id: number;
  username: string;
  password: string;
  role: Role;
  name: string;
}

export interface JwtPayload {
  id: number;
  username: string;
  role: Role;
}
