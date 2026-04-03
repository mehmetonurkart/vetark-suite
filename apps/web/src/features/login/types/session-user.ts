export interface SessionUser {
  id: number;
  username: string;
  displayName: string;
  role: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}
