const createProduct = {
  tags: ["Products"],
  description: "Create a product",
  operationId: "createProduct",
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
        schema: {
          $ref: "#/components/schemas/Products",
        },
      },
    },
    required: true,
  },
};
module.exports = createProduct;
