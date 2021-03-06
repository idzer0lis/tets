// Update with your config settings.
require('./node-environment');

module.exports = {

  development: {
    debug: false,
    client: 'postgresql',
    connection: {
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './lib/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './lib/seeds',
    }
  },

  test: {
    client: 'postgresql',
    connection: {
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './lib/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './lib/seeds',
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './lib/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './lib/seeds',
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './lib/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './lib/seeds',
    }
  },

};
