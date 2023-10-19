const updateProduct = {
  tags: ["Products"],
  description: "Update products",
  operationId: "updateProducts",
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

module.exports = updateProduct;
