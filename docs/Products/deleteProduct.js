const deleteProduct = {
  tags: ["Products"],
  description: "Delete products",
  operationId: "deleteProducts",
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

module.exports = deleteProduct;
