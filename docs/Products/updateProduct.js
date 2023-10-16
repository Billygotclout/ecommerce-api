const updateProduct = {
  tags: ["Products"],
  description: "Update products",
  operationId: "updateProducts",
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

module.exports = updateProduct;
