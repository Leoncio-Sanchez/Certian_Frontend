export type UserRole = 'student' | 'employer' | 'admin';

export interface User {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  name?: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: User;
  role?: UserRole;
  message?: string;
}
