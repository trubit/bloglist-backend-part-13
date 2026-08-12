const { Sequelize } = require("sequelize");
const { DATABASE_URL } = require("./config");
const { Umzug, SequelizeStorage } = require("umzug");

const sequelize = new Sequelize(
  process.env.TESTING === "true"
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL,
  {
    dialect: "postgres",
    logging: false,
  },
);

const runMigrations = async () => {
  const migrator = new Umzug({
    migrations: {
      glob: "migrations/*.js",
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
  });

  const migrations = await migrator.up();
  console.log("Migrations up to date", {
    files: migrations.map((mig) => mig.name),
  });
};

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    console.log("Connection to database has been established successfully.");
  } catch (error) {
    console.log("Unable to connect to the database:", error);
    return process.exit(1);
  }

  return null;
};

module.exports = { connectToDatabase, sequelize };
