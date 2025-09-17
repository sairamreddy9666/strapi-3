module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
        host: env('DATABASE_HOST', 'postgres'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'postgres-database'),
        username: env('DATABASE_USERNAME', 'postgres-user'),
        password: env('DATABASE_PASSWORD', 'postgres-password'),
        ssl: env.bool('DATABASE_SSL', false),
      },
      options: {}
    },
  },
});
