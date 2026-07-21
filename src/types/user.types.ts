export type UserRole = "all_users" | "admin";

interface UserResult<T> {
  _doc: T;
}

export interface IUser extends UserResult<IUser> {
  fullname: string;
  email: string;
  passwordHash: string;
  group: string;
  role: UserRole;
  bookings: string[];
}
