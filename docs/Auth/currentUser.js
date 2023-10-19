const currentUser = {
  tags: ["Auth"],
  description: "Login the user to the system",
  operationId: "login",
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
module.exports = currentUser;
