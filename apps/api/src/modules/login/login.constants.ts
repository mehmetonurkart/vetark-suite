import type { CookieOptions } from 'express';

export const SESSION_COOKIE_NAME = 'vetark_session';

export const SESSION_COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: false,
  path: '/',
  maxAge: 1000 * 60 * 60 * 12,
};
