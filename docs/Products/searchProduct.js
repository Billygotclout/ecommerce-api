const searchProduct = {
  tags: ["Products"],
  description: "Search for products",
  operationId: "searchProducts",
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
module.exports = searchProduct;
