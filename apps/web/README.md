# Web

This application is the frontend service of the `vetark-suite` monorepo.

## What lives here

- `app/`: Next.js App Router entrypoints and route files
- `app/api/session/`: same-origin session proxy routes used by the browser
- `app/login/`: route entry for the login screen
- `app/page.tsx`: authenticated home route entry
- `src/features/login/`: login feature implementation
- `src/features/dashboard/`: authenticated home screen implementation
- `.env.example`: frontend environment variable template
- `proxy.ts`: route protection based on the session cookie
- `public/`: images reused by the login and dashboard experience

## Commands

```bash
npm run dev --workspace web
npm run build --workspace web
```

## Feature convention

Keep route entry files in `app/`, and keep the actual feature code in
`src/features/<feature-name>`.

Examples:

- `src/features/login/components/`
- `src/features/login/api/`
- `src/features/dashboard/`

This keeps each frontend area isolated and easier to maintain.

Current local demo login:

- Username: `vetark`
- Password: `vetark4154`

The browser now posts login requests to the frontend's own `/api/session/*`
routes, which forward requests to the NestJS API. This keeps the cookie flow on
the same origin and avoids direct browser calls to `localhost:4000`.
