const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case constants.NOT_FOUND:
      res.status(404);
      res.json({
        message: "Not Found",
      });
      break;
    case constants.VALIDATION_ERROR:
      res.status(400);
      res.json({
        message: "Validation Error",
      });
      break;
    case constants.SERVER_ERROR:
      res.status(500);
      res.json({
        message: "Server Error",
      });
      break;
    case constants.UNAUTHORISED:
      res.status(401);
      res.json({
        message: "Unauthorised",
      });
      break;
    case constants.FORBIDDEN:
      res.status(403);
      res.json({
        message: "Forbidden",
      });
      break;

    default:
      res.status(500);
      res.json({
        message: "Server Error",
      });
      break;
  }
};

module.exports = errorHandler;
