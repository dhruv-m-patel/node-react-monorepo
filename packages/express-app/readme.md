# @dhruv-m-patel/express-app

An express server to run services

Built with express and typescript providing some extra arms to services with the following:

- Configure apps with service discovery through Swagger or OpenAPI specs and enable request-response validations
- Enables health check by default for an application to provide monitoring capabilities
- Assigns unique id to each request for providing request traceability
- Adds final error handler at the end of the app setup to ensure all unhandled route errors are caught and logged
- Allows running app in clustered startup to leverage full potential of your CPU processes
