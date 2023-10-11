const getAllSellers = {
  tags: ["Admin"],
  description: "Get all sellers from the system",
  operationId: "getAllSellers",

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
module.exports = getAllSellers;
