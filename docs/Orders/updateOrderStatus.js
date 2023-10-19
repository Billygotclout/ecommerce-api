const updateOrderStatus = {
  tags: ["Orders"],
  description: "Update an order for the user",
  operationId: "updateOrder",

  security: [
    {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  ],
  requestBody: {
    content: {
      "application/json": {},
    },
    required: true,
  },
};
module.exports = updateOrderStatus;
