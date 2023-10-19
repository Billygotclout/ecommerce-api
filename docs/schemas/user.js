const User = {
  type: "object",
  properties: {
    firstName: {
      type: "string",
      example: "Demilade",
    },
    lastName: {
      type: "string",
      example: "Williams",
    },
    username: {
      type: "string",
      example: "thetechfarmer",
    },
    email: {
      type: "string",
      example: "williamsoluwademilade@gmail.com",
    },
    password: {
      type: "string",
      description: "Unencrypted password",
      example: "1234!Dse",
    },
  },
};
module.exports = User;
