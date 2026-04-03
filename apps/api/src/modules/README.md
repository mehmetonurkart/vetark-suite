Each backend feature should live in its own folder under this directory.

Example:

- login/
- users/
- appointments/

For a feature, keep its controller, service, dto, entity, guards, and tests close
to each other so removing or changing that feature stays isolated.

Add a `README.md` inside the feature folder whenever the feature becomes a real
domain in the product. The login module is the reference example for this rule.
