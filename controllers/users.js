const router = require("express").Router();
const bcrypt = require("bcrypt");
const { Blog, User } = require("../models");

// GET /api/users
router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ["userId"] },
    },
  });
  res.json(users);
});

// POST /api/users
router.post("/", async (req, res, next) => {
  try {
    const { username, name, password } = req.body;
    const passwordHash = password ? await bcrypt.hash(password, 10) : undefined;
    const user = await User.create({ username, name, passwordHash });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// PUT /api/users/:username
router.put("/:username", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.username },
    });

    if (user) {
      user.name = req.body.name;
      await user.save();
      res.json(user);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
