This folder owns the frontend login flow.

Contents:

- login page shell
- form submission logic
- session-aware client API helpers
- session-aware server API helpers
- same-origin session proxy integration
- shared session-user types

If authentication grows later, keep the login and session-related UI code inside
this feature folder. The browser should talk to the frontend's own
`/api/session/*` routes instead of calling the backend port directly.
