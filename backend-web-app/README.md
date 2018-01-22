# README #

This is the README for the wealthE back-office web app

## Getting Started ###

* Copy `env.example` to `.env` and update all entries. For a list of env variables, look in `lib/config/env.js`.
* Run `npm install` to grab all the required packages
* Run `npm run knex migrate:latest` to migrate your database schema to the latest version
* Run `npm serve` to start serving the app

### Short list of NPM scripts ###

* `npm start` starts the app using Nodemon and exposing the debugger
* `npm run lint` runs ESLint
* `npm run lint-n-fix` runs ESLint with the `--fix` setting ; this also gets run automatically on `git commit` 
* `npm run knex` allows using Knex without having it installed globally
* `npm run nsp` allows using [nodesecurity.io CLI](https://nodesecurity.io/advisories) without having it installed globally ; this also gets run automatically on `git push`

For running the frontend APIs and the frontend app at the same time:

* `npm run dev-frontend` starts both the backoffice app mounted with the frontend APIs and the frontend website in dev mode on port 8000

## Dependencies

Dependencies include:

* PostgreSQL 9.6.5 or later ; several extensions need to be available (they will be set up by a migration script): `uuid-ossp` and `hstore`
* Redis 3+ for session and general cache storage

Optionally, the following can be used:

* Amazon S3 for file storage
* An Ethereum node for blockchain queries and smart contract deployment

## Configuration

Configuration settings defaults live in `lib/config/env.js`. These get overridden by the existence of a `.env` file in the root of
the project deployment folder.

### Database configuration

The database is configured in the `.env` settings file. The relevant keys are described in `lib/config/env.js`.



## Coding Guidelines ##

### General Coding Style and Architecture Guidelines ###

#### Use `CONSTANT_CASE` for all constant-type values ####

This rule applies to both code and database constants and covers stuff 
like entity states (`ACTIVE` or `INACTIVE`), types (`USER`, `FIELD`) or
generally well-known identifiers (including command names).

#### Use `snake_case` for HTML field names in forms and in JSON ####

This one is self-explanatory. Don't mix case styles and **never** use `camelCase` within HTML.

If, for some reason, wholesale renaming of variable names coming from forms or
JSON is justified, use the `change-case` NPM package where it makes sense.

#### Use `camelCase` within the JavaScript codebase with the exception of parameters for data-layer functions ####

The general guideline is to use `camelCase` for the JavaScript code when variable names are concerned.

A concession is made for the data-layer functions, where using `snake_case` makes sense since it makes
it easier to write search, update or create code when using objects as data structures.

## More to come
