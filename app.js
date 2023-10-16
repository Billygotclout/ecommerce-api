const express = require("express");
const app = express();
const swagger = require("./docs/apiDocs");
const path = require("path");
const errorHandler = require("./middleware/errorHandler");

app.use(express.json());
swagger(app);
app.use("/api/auth", require("./routes/user.routes"));
app.use("/api/product", require("./routes/product.routes"));
app.use("/api/orders", require("./routes/order.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use(errorHandler);
app.route("/").get((req, res) => {
  res.send("APP is running");
});
module.exports = app;
