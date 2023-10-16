const winston = require("winston");

const logger = winston.createLogger({
  level: "info", // Log level (options: error, warn, info, verbose, debug, silly)
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console(), // Log to the console
    new winston.transports.File({ filename: "logs/error.log", level: "error" }), // Log errors to a file
    new winston.transports.File({ filename: "logs/combined.log" }), // Log all levels to a different file
  ],
});
module.exports = logger;
