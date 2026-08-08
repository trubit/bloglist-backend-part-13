const { Sequelize } = require("sequelize");
const { DATABASE_URL } = require("./config");

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  logging: false,
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    if (process.env.TESTING === "true") {
      await sequelize.sync();
    }
    console.log("Connection to database has been established successfully.");
  } catch (error) {
    console.log("Unable to connect to the database:", error);
    return process.exit(1);
  }

  return null;
};

module.exports = { connectToDatabase, sequelize };
