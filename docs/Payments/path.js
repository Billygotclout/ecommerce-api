const payment = require("./pay");
const payPath = {
  "/api/product/pay": {
    post: payment,
  },
};
module.exports = payPath;
