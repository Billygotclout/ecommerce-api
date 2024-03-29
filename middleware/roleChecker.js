const User = require("../models/User");
const CustomError = require("../utils/CustomError");

// check user role and grant access
const roleChecker = (roles) => async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!roles.includes(user.role)) {
    throw new CustomError(
      "Please contact your administrator for access permissions.",
      403
    );
  }
  next();
};

module.exports = roleChecker;
