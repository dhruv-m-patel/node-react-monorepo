# node-service

A basic node app running a server with an endpoint

### Setup

Run `copy .env.example .env` and in `.env` set PORT to 5000

When you run `npm start` from the root, you will see API running at http://localhost:5000

### Service contract validations

The service requires to integrate API specifications written in OpenAPI v3 which can be located in `src/api/spec.yaml`.

All requests and responses must be logged in API specifications.

`express-openapi-validator` is used to integrate a middleware to comply with written API specifications and ensure requests and responses comply with it.
