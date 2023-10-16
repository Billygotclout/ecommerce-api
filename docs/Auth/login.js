const login = {
  tags: ["Auth"],
  description: "Login the user to the system",
  operationId: "login",
  requestBody: {
    content: {
      "application/json": {},
    },
    required: true,
  },
};
module.exports = login;
