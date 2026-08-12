const router = require("express").Router();
const { ReadingList, Blog, User } = require("../models");
const { tokenExtractor } = require("../util/middleware");

router.post("/", async (req, res, next) => {
  try {
    const { blogId, userId } = req.body;

    if (!blogId || !userId) {
      return res.status(400).json({ error: "blogId and userId are required" });
    }

    const blog = await Blog.findByPk(blogId);
    if (!blog) {
      return res.status(404).json({ error: "blog not found" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    const existingEntry = await ReadingList.findOne({
      where: { blogId, userId },
    });

    if (existingEntry) {
      return res.status(400).json({ error: "reading list entry already exists" });
    }

    const readingList = await ReadingList.create({
      blogId,
      userId,
      read: false,
    });

    res.json({
      id: readingList.id,
      blog_id: readingList.blogId,
      user_id: readingList.userId,
      read: readingList.read,
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/readinglists/:id
router.put("/:id", tokenExtractor, async (req, res) => {
  const readingList = await ReadingList.findByPk(req.params.id);

  if (!readingList) {
    return res.status(404).json({ error: "reading list entry not found" });
  }

  // Only the owner of the reading list entry can mark it as read
  if (readingList.userId !== req.decodedToken.id) {
    return res.status(401).json({ error: "only the owner can mark as read" });
  }

  readingList.read = req.body.read;
  await readingList.save();

  res.json(readingList);
});

module.exports = router;
