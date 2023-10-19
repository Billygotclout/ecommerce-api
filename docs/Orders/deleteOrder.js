const deleteOrder = {
  tags: ["Orders"],
  description: "Delete user order",
  operationId: "deleteOrder",

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

module.exports = deleteOrder;
