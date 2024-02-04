# @dhruv-m-patel/packages

A monorepo for node-react packages built using lerna, managed with yarn workspaces

![CI Status](https://github.com/dhruv-m-patel/packages/workflows/build/badge.svg)

## Setup

```
git clone git@github.com:dhruv-m-patel/packages.git
cd packages
npx corepack enable
yarn install
yarn build
```

## Packages

- **boilerplates**: Boilerplate samples of node-only and node-react packages
- **packages**: Reusable, scoped, public packages published to npm

## Publishing packages

- Please run `yarn changeset` command locally and prepare changeset submitted with your PR to publish packages.
- Merging changes to main will automatically trigger Github Actions workflow to create a release PR looking at the changesets.
- Once changeset release PR is approved and merged to main branch, it will automatically publish packages through the GitHub Actions workflow.
