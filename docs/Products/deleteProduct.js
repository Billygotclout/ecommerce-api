const deleteProduct = {
  tags: ["Products"],
  description: "Delete products",
  operationId: "deleteProducts",
  security: [
    {
      bearerAuth: [],
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
