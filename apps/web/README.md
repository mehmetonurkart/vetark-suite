# Web

This application is the frontend service of the `vetark-suite` monorepo.

## What lives here

- `app/`: Next.js App Router entrypoints and route files
- `src/features/`: feature-first frontend folders
- `src/features/home/`: starter feature used by the landing page
- `.env.example`: frontend environment variable template

## Commands

```bash
npm run dev --workspace web
npm run build --workspace web
```

## Feature convention

When a new screen or flow is added, keep its UI logic inside
`src/features/<feature-name>`.

Example:

- `src/features/login/components/`
- `src/features/login/hooks/`
- `src/features/login/api/`
- `src/features/login/schema/`

Only route wiring should stay in `app/`. This keeps each feature isolated and
easy to find.
