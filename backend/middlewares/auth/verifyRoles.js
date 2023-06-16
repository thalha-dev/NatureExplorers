const createHttpError = require("http-errors");

const verifyRoles = (...passedRoles) => {
  return (req, res, next) => {
    const givenRoles = req.roles;
    try {
      if (!givenRoles) {
        throw createHttpError(401, "Roles not set");
      }

      const allowedRoles = [...passedRoles];

      const isAllowed = givenRoles
        .map((role) => {
          return allowedRoles.includes(role);
        })
        .find((value) => {
          return value === true;
        });

      if (!isAllowed) {
        throw createHttpError(401, "You don't have access");
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = verifyRoles;
