const currentUser = {
  tags: ["Auth"],
  description: "Login the user to the system",
  operationId: "login",
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
module.exports = currentUser;
