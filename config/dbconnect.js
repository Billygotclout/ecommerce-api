const mongoose = require("mongoose");
const logger = require("../helpers/logger");

const dbConnection = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_CONNECTION_STRING);

    logger.info(
      `Db Connected: ${connect.connection.host} ${connect.connection.name}`
    );
  } catch (err) {
    logger.error(err.message);
    process.exit(1);
  }
};
module.exports = dbConnection;
