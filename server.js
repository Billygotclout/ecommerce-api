const app = require("./app");
const dbConnection = require("./config/dbconnect");
const logger = require("./helpers/logger");

const dotenv = require("dotenv").config();

const env = process.env.NODE_ENV || "development";
const config = require(`./config/config.${env}`);
const port = config.port;
dbConnection();
app.listen(port, () => {
  logger.info(`Server is listening on http://localhost:${port}`);
});
