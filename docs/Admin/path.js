const getAllSellers = require("./getAllSellers");
const getAllUsers = require("./getAllUsers");

const adminPath = {
  "/api/admin/get-all-users": {
    get: getAllUsers,
  },
  "/api/admin/get-all-sellers": {
    get: getAllSellers,
  },
};

module.exports = adminPath;
