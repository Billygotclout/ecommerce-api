const getAllUsers = {
  tags: ["Admin"],
  description: "Get all users from the system",
  operationId: "getAllUsers",

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
module.exports = getAllUsers;
