# Vetark Suite

This repository is the new generic monorepo foundation for the project.

The old codebase stays untouched under `oldversion/`. The new work starts from the
root with separate frontend and backend applications.

## Installed in this step

1. Docker Desktop presence was verified on this machine.
2. A Turborepo workspace was created for the new structure.
3. `apps/web` was created as a Next.js application.
4. `apps/api` was created as a NestJS application.
5. PostgreSQL and Redis were added with Docker Compose.

## Current structure

```text
vetark-suite/
|-- apps/
|   |-- api/
|   |   |-- src/
|   |   |   |-- configure-app.ts
|   |   |   `-- modules/
|   |   |       `-- health/
|   |   |-- test/
|   |   `-- .env.example
|   `-- web/
|       |-- app/
|       |-- src/
|       |   `-- features/
|       |       `-- home/
|       `-- .env.example
|-- packages/
|   |-- eslint-config/
|   |-- typescript-config/
|   `-- ui/
|-- oldversion/
|-- docker-compose.yml
|-- turbo.json
`-- package.json
```

## What each main path is for

- `apps/api`: backend service
- `apps/api/src/configure-app.ts`: shared API bootstrap rules
- `apps/api/src/modules`: backend feature folders
- `apps/api/src/modules/health`: starter backend module for API health checks
- `apps/api/test`: API end-to-end tests
- `apps/web`: frontend service
- `apps/web/app`: route files for Next.js
- `apps/web/src/features`: frontend feature folders
- `apps/web/src/features/home`: starter frontend feature for the landing page
- `packages/ui`: shared UI package for reusable frontend components
- `packages/eslint-config`: shared lint rules
- `packages/typescript-config`: shared TypeScript presets
- `oldversion`: previous version kept as reference only
- `docker-compose.yml`: local PostgreSQL and Redis services
- `.env.example`: root Docker variable template

## Feature folder rule

This repo will follow a feature-first convention.

Frontend example:

- `apps/web/src/features/login/components/`
- `apps/web/src/features/login/hooks/`
- `apps/web/src/features/login/api/`

Backend example:

- `apps/api/src/modules/login/login.module.ts`
- `apps/api/src/modules/login/login.controller.ts`
- `apps/api/src/modules/login/login.service.ts`
- `apps/api/src/modules/login/dto/`

This means when a feature such as login is added, everything related to that
feature should live inside its own frontend and backend folders. If that feature
is removed later, the removal stays isolated.

## Local development

Install dependencies:

```bash
npm install
```

Run both apps with Turbo:

```bash
npm run dev
```

Run one app only:

```bash
npm run dev --workspace web
npm run dev --workspace api
```

Bring up PostgreSQL and Redis:

```bash
docker compose up -d
```

## Default local URLs

- Web: `http://localhost:3000`
- API: `http://localhost:4000/api/health`
- PostgreSQL: `localhost:5432`
- Redis: `localhost:6379`
