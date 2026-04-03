This folder contains backend configuration helpers.

Current file:

- `env.ts`: loads environment variables and exposes normalized application
  settings such as port, database URL, CORS origin, JWT secret, and Redis URL

Keep backend configuration parsing here so runtime modules can stay focused on
feature logic.
