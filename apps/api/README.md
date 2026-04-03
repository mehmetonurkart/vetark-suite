# API

This application is the backend service of the `vetark-suite` monorepo.

## What lives here

- `src/main.ts`: boots NestJS and listens on port `4000` by default
- `src/configure-app.ts`: shared app bootstrap rules such as CORS and `/api` prefix
- `src/config/`: environment helpers used by the backend
- `src/infrastructure/database/`: PostgreSQL access layer
- `src/modules/`: feature-first backend modules
- `src/modules/health/`: starter module used to verify the API is running
- `src/modules/login/`: login feature and session endpoints
- `scripts/setup-local-db.ts`: local database bootstrap and demo-user seed script
- `test/`: end-to-end tests
- `.env.example`: local environment variable template

## Commands

```bash
npm run dev --workspace api
npm run build --workspace api
npm run test --workspace api
npm run db:setup --workspace api
```

## Feature convention

When a new backend feature is added, create a dedicated folder inside
`src/modules/<feature-name>`.

Example:

- `src/modules/login/login.module.ts`
- `src/modules/login/login.controller.ts`
- `src/modules/login/login.service.ts`
- `src/modules/login/dto/`

This keeps each domain isolated so changing or removing a feature only affects its
own folder.

## Local login setup

After PostgreSQL is running, prepare the database with:

```bash
npm run db:setup --workspace api
```

This creates the starter auth table and ensures the demo login user exists.

Current local credentials:

- PostgreSQL: `vetark / vetark41543`
- Demo login: `vetark / vetark4154`
