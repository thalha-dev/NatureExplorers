const jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.Authorization || req.headers.authorization;
  try {
    if (!authHeader) {
      throw createHttpError(400, "Auth header not set");
    }

    if (!authHeader.startsWith("Bearer")) {
      throw createHttpError(400, "Auth header not set in proper format");
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
      if (error) {
        throw createHttpError(403, "Authentication Failed");
      }

      req.user = decoded.UserInfo.username;
      req.roles = decoded.UserInfo.roles;

      next();
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyJWT;
