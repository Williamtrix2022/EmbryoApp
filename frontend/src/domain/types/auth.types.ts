export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
