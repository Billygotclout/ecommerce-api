const currentUser = require("./currentUser");
const login = require("./login");
const register = require("./register");

const authPath = {
  "/api/auth/login": {
    post: login,
  },
  "/api/auth/register": {
    post: register,
  },
  "/api/auth/current-user": {
    post: currentUser,
  },
};
module.exports = authPath;
