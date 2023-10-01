const express = require("express");
const dbConnection = require("./config/dbconnect");

const dotenv = require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5003;

dbConnection();
app.route("/").get((req, res) => {
  res.send("APP is running");
});
app.use(express.json());

app.use("/api/auth", require("./routes/userRoute"));
app.use("/api/product", require("./routes/productRoute"));
app.use("/api/orders", require("./routes/orderRoutes"));

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
