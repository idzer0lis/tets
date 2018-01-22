# README

This is the README for the Wealthe Migrate Contribution Dashboard frontend website app

## Configuration

In order to create a build that features specific settings like the correct reCAPTCHA or Google Analytics site key, a
`.env` file should be created in the root of the project folder with those settings configured there.

There already is an `.env.example` file available with explanations for all the available settings. 

## Build Setup

``` bash
# install dependencies ; make sure NODE_ENV is set to "development"
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## Deployment

Once the application is built using `npm run build`, the content of the `dist/` folder should be placed somewhere where it cam be then served
statically. No other steps are necessary.
