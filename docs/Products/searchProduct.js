const searchProduct = {
  tags: ["Products"],
  description: "Search for products",
  operationId: "searchProducts",
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
module.exports = searchProduct;
