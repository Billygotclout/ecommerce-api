const login = {
  tags: ["Auth"],
  description: "Login the user to the system",
  operationId: "login",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            email: {
              type: "string",
              example: "john.snow@email.com",
            },
            password: {
              type: "string",
              example: "442893aba778ab321dc151d9b1ad98c64ed56c07f8cbaed",
            },
          },
        },
      },
    },
    required: true,
  },
  responses: {
    200: {
      description: "User successfully logged in",
    },
  },
};
module.exports = login;
