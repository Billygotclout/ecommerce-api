const Products = {
  type: "object",
  properties: {
    user_id: {
      type: "string",
      example: "82BSHBD626823",
      description: "Mongoose Object Id",
    },
    title: {
      type: "string",
      example: "Kids",
    },
    description: {
      type: "string",
      example: "Long description here",
    },
    price: {
      type: "number",
      example: "5000",
    },
    image: {
      type: "string",
      example: "image path string",
    },
    category: {
      type: "string",
      example: "food",
    },
  },
};

module.exports = Products;
