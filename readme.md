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

Packages for the frontend and backend can be found in following directories:

- **web/react-app**: A create-react-app utilizing the typescript template making api calls using proxy setup
- **services/node-service**: A node-express server with a couple of endpoints and unit + integration tests

### Adding new dependencies in a specific package

- To add a new dependency into a single package: `npx lerna add npmPackageName --scope=packageName`

  e.g. `npx lerna add dotenv --scope=auth-service`

- To add a new dependency into multiple packages: `npx lerna add npmPackageName --scope={packageName1, packageName2}`

  e.g. `npx lerna add dotenv --scope={auth-service,high-fives-service}`

- To remove a dependency, edit package.json removing the line for the dependency and then run `npm run bootstrap`

- To add a devDependency, you would have to use `npx lerna add` to add a new dependency first and then move it to devDependencies for the package and then run `npm run bootstrap`


## Monorepo commands

- `npm run clean`: Cleans node_modules from all packages
- `npm run bootstrap`: This will install dependencies from all packages hoisting and symlinking node packages as required
- `npm run build`: Runs build in all packages
- `npm test`: Runs tests in all packages
