const express = require("express");
const loginRouter = require("./controllers/login");
const authorsRouter = require("./controllers/authors");

const app = express();

const { PORT } = require("./util/config");
const { connectToDatabase, sequelize } = require("./util/db");
const { errorHandler } = require("./util/middleware");

const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("ok");
});

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/authors", authorsRouter);

app.post("/api/reset", async (req, res, next) => {
  try {
    await sequelize.query("TRUNCATE TABLE blogs, users RESTART IDENTITY CASCADE");
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
