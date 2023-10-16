const getAllProducts = {
  tags: ["Products"],
  description: "Get products",
  operationId: "getProducts",
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

module.exports = getAllProducts;
