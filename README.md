# Express API Template
![badge](https://img.shields.io/github/license/HigorAlves/express-api?style=flat-square)
![issues](https://img.shields.io/github/issues/HigorAlves/express-api?style=flat-square)
![version](https://img.shields.io/github/package-json/v/higoralves/express-api?style=flat-square)
![lastcommit](https://img.shields.io/github/last-commit/higoralves/express-api?style=flat-square)

Express API is an back-end service that can be deploy anywhere, with some default configuration its perfect to start an API and use in production.

## How to run local with Docker

To run in your local machine with a docker image you can use the following command: 

```bash
docker-compose -f Docker/docker-compose.yml up -d
```

To shutdown the developer server: 

```bash
docker-compose -f Docker/docker-compose.yml down
```

## How to test in Local

This project is configured to test everything (that you coverage of course) automaticaly you just need to run this command:

```bash
npm run ci
```

## How to execute Database Migrations

After you change something on the models folder and want to reflect that changes on database you can simple execute this codes:

```bash
npm run typeorm-migration-generate

npm run typeorm-migration-run

npm run typeorm-migration-revert
```

## How to Commit Changes

This project use this two packages: [Standart Version](https://github.com/conventional-changelog/standard-version) and [Commitizen](https://github.com/commitizen/cz-cli).

By default we use the [Conventional Changelog](https://github.com/conventional-changelog/conventional-changelog) and [Semantic Versioning](https://semver.org) to manage versions and more.

```bash
# Add your changes
git add -A

# Commit with Commitizen
git cz

# Release as a target type imperatively like npm version
npm run release -- --release-as major | minor | patch

OR

npm run release -- --release-as 1.1.0

# Release as a pre-release
npm run release -- --prerelease

# Bump your version and generate a new CHANGELOG
npm run release

# Then push your modifications to repo 
git push origin <branch>
```

## The .env file

This variables above is a list of how your ```.env``` needs to be configured.

```
PORT=<YOUR_PORT> default is 4000
JWT_SECRET=<YOUR_SECRET>
SENDGRID_API_KEY=<YOURT_API_KEY>
FACEBOOK_APP_ID=<YOUR_API_ID>
FACEBOOK_APP_SECRET=<YOUR_APP_SECRET>
```