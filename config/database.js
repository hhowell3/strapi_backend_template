const path = require('path');

// Strapi Cloud automatically configures the database using DATABASE_URL.
// This generic config handles both local sqlite and production postgres.

module.exports = ({ env }) => {
    const client = env('DATABASE_CLIENT', 'sqlite');

    const connections = {
        sqlite: {
            connection: {
                filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
            },
            useNullAsDefault: true,
        },
        postgres: {
            connection: {
                connectionString: env('DATABASE_URL'),
                ssl: env.bool('DATABASE_SSL', false) && {
                    rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
                },
            },
            pool: {
                min: env.int('DATABASE_POOL_MIN', 2),
                max: env.int('DATABASE_POOL_MAX', 10),
            },
        },
    };

    return {
        connection: {
            client,
            ...connections[client],
            acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
        },
    };
};
