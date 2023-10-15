const app = require("./app");
const dbConnection = require("./config/dbconnect");

const dotenv = require("dotenv").config();

const env = process.env.NODE_ENV || "development";
const config = require(`./config/config.${env}`);
const port = config.port;
// dbConnection();
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
