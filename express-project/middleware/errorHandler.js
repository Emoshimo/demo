const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const status = res.statusCode ? res.statusCode : 500;
  switch (status) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation error",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;

    case constants.UNAUTHORIZED:
      res.json({
        title: "Unauthorized error",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;

    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden error",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;

    case constants.NOT_FOUND:
      res.json({
        title: "Not found",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;
    case constants.SERVER_ERROR:
      res.json({
        title: "Server Error",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;
    default:
      console.log("No error all good.");
      break;
  }
};

module.exports = errorHandler;
