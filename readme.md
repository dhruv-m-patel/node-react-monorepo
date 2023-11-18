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

## How monorepo is used to version and publish packages?

- This monorepo embodies [Gitflow Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) as the development process.
  - `develop` branch is default branch. This is where all regular code development is merged. This branch is deemed unstable and is usually busy with frequent merging.
  - `master` branch is primary branch. This is where stable releases are merged. If hotfixes are needed, branch off of master and merge it to master after ensuring stability and bring the changes down to develop.
  - `Other` branches such as feature or regular branches are branched off of `develop` and if it stays open for longer, to ensure it does not get stale, consider merging latest from develop or rebasing it off of latest changes in develop.
  - `release` branches are usually branched off of develop at the point it is decided that a release is needed. After ensuring branch is stable, versioning is done and then code is merged to master which will trigger publish of packages.

- Once release branch is created, as mentioned above in last point, once you are at the point changes seem stable, versioning is done. This is done locally by running `yarn run version`. After this, push your changes up to remote using `git push --follow-tags`

- Merge changes to master, this will trigger running `yarn ci:publish` in Github Actions workflow and packages should automatically be published.
