const jwt = require("jsonwebtoken");
const { Session, User } = require("../models");

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (
    error.name === "SequelizeValidationError" ||
    error.name === "SequelizeUniqueConstraintError"
  ) {
    return response.status(400).json({
      error: error.errors.map((e) => e.message),
    });
  }

  if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "invalid token" });
  }

  next(error);
};

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get("authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      const token = authorization.substring(7);
      const decodedToken = jwt.verify(token, process.env.SECRET);

      // Check that the session still exists
      const session = await Session.findOne({ where: { token } });
      if (!session) {
        return res.status(401).json({ error: "session expired" });
      }

      // Check that the user is not disabled
      const user = await User.findByPk(decodedToken.id);
      if (!user || user.disabled) {
        return res.status(401).json({ error: "account disabled" });
      }

      req.decodedToken = decodedToken;
    } catch {
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }

  next();
};

module.exports = {
  errorHandler,
  tokenExtractor,
};
