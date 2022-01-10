module.exports = ({ env }) => {
  return {
    defaultConnection: "default",
    connections: {
      default: {
        connector: "bookshelf",
        settings: {
          client: "postgres",
          host: env("DATABASE_HOST", "localhost"),
          port: env.int("DATABASE_PORT", 3306),
          database: env("DATABASE_NAME", "blogdatabase"),
          username: env("DATABASE_USERNAME", "postgres"),
          password: env("DATABASE_PASSWORD", "password"),
          ssl: env.bool("DATABASE_SSL", false),
        },
        options: {},
      },
    },
  };
};
