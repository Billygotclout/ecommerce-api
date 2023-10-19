const createOrder = require("./createOrder");
const deleteOrder = require("./deleteOrder");
const updateOrderStatus = require("./updateOrderStatus");
const viewOrders = require("./viewOrders");

const orderPath = {
  "/api/orders/view-orders": {
    get: viewOrders,
  },
  "/api/orders/create-order": {
    post: createOrder,
  },
  "/api/orders/update-order/:id": {
    patch: updateOrderStatus,
  },
  "/api/orders/delet-order/:id": {
    delete: deleteOrder,
  },
};
module.exports = orderPath;
