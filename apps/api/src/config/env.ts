import 'dotenv/config';

const DEFAULT_PORT = 4000;
const DEFAULT_DATABASE_URL =
  'postgresql://vetark:vetark41543@localhost:5432/vetark';
const DEFAULT_CORS_ORIGIN = 'http://localhost:3000';
const DEFAULT_JWT_SECRET = 'vetark-local-session-secret';
const DEFAULT_REDIS_URL = 'redis://localhost:6379';

function toNumber(value: string | undefined, fallback: number): number {
  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : fallback;
}

function toOrigins(value: string | undefined): string[] {
  return (value ?? DEFAULT_CORS_ORIGIN)
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
}

export const appEnv = {
  port: toNumber(process.env.PORT, DEFAULT_PORT),
  corsOrigins: toOrigins(process.env.CORS_ORIGIN),
  databaseUrl: process.env.DATABASE_URL ?? DEFAULT_DATABASE_URL,
  redisUrl: process.env.REDIS_URL ?? DEFAULT_REDIS_URL,
  jwtSecret: process.env.JWT_SECRET ?? DEFAULT_JWT_SECRET,
};
