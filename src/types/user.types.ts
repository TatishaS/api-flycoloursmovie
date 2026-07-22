export type UserRole = "all_users" | "admin";

export interface IUser {
  fullname: string;
  email: string;
  passwordHash: string;
  group: string;
  role: UserRole;
  bookings: string[];
}

export interface RegisterRequestBody {
  fullname: string;
  email: string;
  password: string;
  group?: string;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface UpdateUserRequestBody {
  fullname?: string;
  email?: string;
  group?: string;
}
