const express = require("express");
const dbConnection = require("./config/dbconnect");

const dotenv = require("dotenv").config();

const app = express();
const env = process.env.NODE_ENV || "development";
const config = require(`./config/config.${env}`);
const port = config.port;
dbConnection();
app.route("/").get((req, res) => {
  res.send("APP is running");
});
app.use(express.json());

app.use("/api/auth", require("./routes/userRoute"));
app.use("/api/product", require("./routes/productRoute"));
app.use("/api/orders", require("./routes/orderRoutes"));

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
