const getAllUsers = {
  tags: ["Admin"],
  description: "Get all users from the system",
  operationId: "getAllUsers",

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
module.exports = getAllUsers;
