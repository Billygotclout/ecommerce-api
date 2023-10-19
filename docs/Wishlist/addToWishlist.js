const addToWishlist = {
  tags: ["Wishlist"],
  description: "Add product to wishlist for the user",
  operationId: "addToWishlist",

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

module.exports = addToWishlist;
