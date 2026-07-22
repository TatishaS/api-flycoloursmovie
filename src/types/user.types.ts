export type UserRole = "all_users" | "admin";

export interface IUser {
  fullname: string;
  email: string;
  passwordHash: string;
  group: string;
  role: UserRole;
  bookings: string[];
}
