export interface SessionUser {
  id: number;
  username: string;
  displayName: string;
  role: string;
}

export interface StoredLoginUser extends SessionUser {
  passwordHash: string;
}

export interface SessionTokenPayload {
  sub: number;
}
