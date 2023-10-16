const Orders = {
  type: "object",
  properties: {
    user_id: {
      type: "string",
      example: "82BSHBD626823",
      description: "Mongoose Object Id",
    },
    product_id: {
      type: "string",
      example: "82BSHBD626823",
      description: "Mongoose Object Id",
    },
    status: {
      type: "string",
      enum: ["pending", "confirmed", "shipped", "delivered"],
      example: "pending",
    },
  },
};

module.exports = Orders;
