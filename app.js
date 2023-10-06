const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());

app.use("/api/auth", require("./routes/user.routes"));
app.use("/api/product", require("./routes/product.routes"));
app.use("/api/orders", require("./routes/order.routes"));
app.use("/api/admin", require("./routes/admin.routes"));

app.route("/").get((req, res) => {
  res.send("APP is running");
});
module.exports = app;
