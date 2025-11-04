export interface AuthUser {
  id: number;
  name: string;
  login: string;
}

export interface LoginResponse {
  access_token: string;
  user: AuthUser;
}

export interface LoginCredentials {
  login: string;
  password: string;
}
