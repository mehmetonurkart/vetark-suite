# Authentication

## Purpose

The current authentication layer provides a clean local starter flow for the
project while keeping frontend and backend responsibilities separate.

The goal is to make the login feature easy to find, easy to extend, and easy to
remove without affecting unrelated modules.

## Local Credentials

- PostgreSQL user: `vetark`
- PostgreSQL password: `vetark41543`
- Demo login username: `vetark`
- Demo login password: `vetark4154`

The PostgreSQL credentials are used by the NestJS API connection. The demo login
account is stored in the `app_users` table.

## Backend Flow

Backend auth lives in `apps/api/src/modules/login/`.

Current responsibilities:

- validate login input
- look up the user in PostgreSQL
- compare the password with `bcryptjs`
- issue a signed session token with Nest JWT
- store the session in the `vetark_session` cookie
- return the current user through `/api/login/me`
- clear the cookie through `/api/login/logout`

## Frontend Flow

Frontend auth lives in `apps/web/src/features/login/`.

Current responsibilities:

- render the login screen
- submit credentials through same-origin Next session routes
- rely on the `vetark_session` cookie for session state
- protect routes through `apps/web/proxy.ts`
- load the authenticated dashboard from `apps/web/src/features/dashboard/`

## Routes And Endpoints

Frontend routes:

- `/login`: login screen
- `/`: authenticated home dashboard

Backend endpoints:

- `POST /api/login`: authenticate and create cookie-based session
- `GET /api/login/me`: return the current session user
- `POST /api/login/logout`: clear the session cookie
- `GET /api/health`: basic API readiness check

Frontend session routes:

- `POST /api/session/login`: browser-facing login proxy
- `GET /api/session/me`: browser-facing current-user proxy
- `POST /api/session/logout`: browser-facing logout proxy

## Local Setup

1. Start PostgreSQL and Redis with `docker compose up -d`.
2. Ensure `apps/api/.env` points to the local PostgreSQL password
   `vetark41543`.
3. Run `npm run db:setup --workspace api`.
4. Start the applications with `npm run dev`.
5. Open `http://localhost:3000/login` and sign in with the demo account.

## Folder Ownership

- `apps/web/src/features/login/`: login UI and client/server session helpers
- `apps/web/src/features/dashboard/`: authenticated home screen
- `apps/api/src/modules/login/`: login endpoints and session rules
- `apps/api/scripts/setup-local-db.ts`: local table creation and seed user

This keeps authentication isolated as a domain, so future changes stay within a
predictable set of folders.
