const CustomError = require("../utils/CustomError");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  // Handle other types of errors here
  // You can log the error or handle it differently as needed
  console.error(err); // Log the error for debugging

  // Send a generic error response with a 500 status code
  res.status(500).json({ error: "Internal Server Error" });
};

module.exports = errorHandler;
