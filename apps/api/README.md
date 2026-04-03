# API

This application is the backend service of the `vetark-suite` monorepo.

## What lives here

- `src/main.ts`: boots NestJS and listens on port `4000` by default
- `src/configure-app.ts`: shared app bootstrap rules such as CORS and `/api` prefix
- `src/modules/`: feature-first backend modules
- `src/modules/health/`: starter module used to verify the API is running
- `test/`: end-to-end tests
- `.env.example`: local environment variable template

## Commands

```bash
npm run dev --workspace api
npm run build --workspace api
npm run test --workspace api
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
