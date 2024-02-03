# @dhruv-m-patel/packages

A monorepo for simple, useful node and react packages

![CI Status](https://github.com/dhruv-m-patel/packages/workflows/build/badge.svg)

## Setup

```
git clone git@github.com:dhruv-m-patel/packages.git
cd packages
nvm use # Enforces using node v18
corepack enable
yarn install
yarn build
```

## Workspaces

- **boilerplates**: Boilerplate samples of node-only and node-react packages
- **packages**: Reusable, scoped, public packages published to npm

## Publishing packages

- Merging changes to main, will automatically trigger running `yarn ci:publish` in Github Actions to publish packages with new tags to npm registry.
