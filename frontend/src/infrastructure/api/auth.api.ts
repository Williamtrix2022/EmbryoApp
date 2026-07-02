import { AuthUser, LoginCredentials } from '../../domain/types/auth.types';
import { httpPost } from './http-client';

interface LoginApiResponse {
  data: {
    token: string;
    user: AuthUser;
  };
}

export async function loginApi(credentials: LoginCredentials): Promise<{ token: string; user: AuthUser }> {
  const response = await httpPost<LoginApiResponse>('/api/auth/login', credentials);
  return response.data;
}

export async function logoutApi(): Promise<void> {
  await httpPost<void>('/api/auth/logout', {});
}
