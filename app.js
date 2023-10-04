const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());

app.use("/api/auth", require("./routes/userRoute"));
app.use("/api/product", require("./routes/productRoute"));
app.use("/api/orders", require("./routes/orderRoutes"));

app.route("/").get((req, res) => {
  res.send("APP is running");
});
module.exports = app;
