const mongoose = require("mongoose");
const { userSchema } = require("../helpers/validation");

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter first name"],
  },
  lastName: {
    type: String,
    required: [true, "Please enter last name"],
  },
  username: {
    type: String,
    required: [true, "Please enter user name"],
  },
  email: {
    type: String,
    required: [true, "Please enter valid email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
  },
  role: {
    type: String,
    enum: ["seller", "customer", "admin"],
    default: "customer",
  },
  wishlist: [],
});

UserSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
  },
});
module.exports = mongoose.model("User", UserSchema);
