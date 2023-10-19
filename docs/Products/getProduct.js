const getProduct = {
  tags: ["Products"],
  description: "Get products",
  operationId: "getProducts",
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
module.exports = getProduct;
