# node-react-monorepo

A monorepo for node-react projects built using lerna

![CI Status](https://github.com/dhruv-m-patel/node-react-monorepo/workflows/build/badge.svg)

## Setup

```
git clone git@github.com:dhruv-m-patel/node-react-monorepo.git
cd node-react-monorepo
npm run bootstrap
npm run build
npm start
```

Access the react app running on http://localhost:3000

Access the backend api running on http://localhost:5000/api/message

## Packages

Packages for the frontend and backend can be found in `packages` directory

- **frontend**: A create-react-app utilizing the typescript template making api calls using proxy setup
- **backend**: A node-express server with a couple of endpoints and unit + integration tests

## Monorepo commands

- `npm run clean`: Cleans node_modules from all packages
- `npm run bootstrap`: This will install dependencies from all packages hoisting and symlinking node packages as required
- `npm run build`: Runs build in all packages
- `npm test`: Runs tests in all packages
