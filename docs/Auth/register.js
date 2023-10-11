const register = {
  tags: ["Auth"],
  description: "Login the user to the system",
  operationId: "login",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/User",
        },
      },
    },
    required: true,
  },
};
module.exports = register;
