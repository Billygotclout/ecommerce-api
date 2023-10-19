const viewOrders = {
  tags: ["Orders"],
  description: "View an order for the useer",
  operationId: "viewOrder",

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
module.exports = viewOrders;
