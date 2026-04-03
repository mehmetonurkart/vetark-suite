This folder owns the authenticated home screen.

Contents:

- dashboard shell and layout
- authenticated dashboard shell
- sidebar, top bar, stat tiles, and visual panels
- logout interaction for the current session

The dashboard can grow here without mixing its code into the login feature. The
current session user is resolved on the route layer and then passed into this
feature.
