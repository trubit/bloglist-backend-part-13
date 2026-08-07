require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false, // set to console.log if you want to see the SQL query
});

const main = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    const blogs = await sequelize.query("SELECT * FROM blogs", {
      type: Sequelize.QueryTypes.SELECT,
    });

    blogs.forEach((blog) => {
      console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`);
    });

    sequelize.close();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

main();
