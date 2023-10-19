const createOrder = {
  tags: ["Orders"],
  description: "Create an order for the user",
  operationId: "createOrder",

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
      "application/json": {
        $ref: "#/components/schemas/Orders",
      },
    },
    required: true,
  },
};

module.exports = createOrder;
