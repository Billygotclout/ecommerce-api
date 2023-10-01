const bcrypt = require("bcrypt");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { userSchema } = require("../helpers/validation");
const CustomError = require("../utils/CustomError");
const dotenv = require("dotenv").config();
const register = asyncHandler(async (req, res) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;
    const { error } = userSchema.validate(req.body, { abortEarly: false });
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new CustomError("User already exist", 400);
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      password: hashPassword,
    });

    res.status(201).json({
      message: "User successfully created",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
});
const login = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (user) {
      if (await bcrypt.compareSync(password, user.password)) {
        const accessToken = jwt.sign(
          {
            user: {
              username: user.username,
              password: user.password,
              id: user.id,
            },
          },
          process.env.TOKEN_SECRET,
          { expiresIn: "5h" }
        );
        res.status(200).json({
          message: "User successfully logged in",
          token: accessToken,
          data: user,
        });
      } else {
        throw new CustomError(
          "Please double-check your password and try again",
          400
        );
      }
    } else {
      throw new CustomError("Sorry we couldn't find that user", 404);
    }
  } catch (error) {
    console.log(error);
  }
});
const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ message: "User Successfully fetched", data: user });
  } catch (error) {
    console.log(error);
  }
};
const forgotPassword = async (req, res) => {
  function generateToken(payload) {
    return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "1h" });
  }

  // Function to send password reset email
  function sendPasswordResetEmail(email, resetToken) {
    const transporter = nodemailer.createTransport({
      // Set up your email provider configuration
      // ...
      service: "gmail",
      auth: {
        user: "demsdems28@gmail.com",
        pass: `${process.env.GMAIL_PASS}`,
      },
    });

    const mailOptions = {
      from: "demsdems28@gmail.com",
      to: email,
      subject: "Password Reset",
      text: `Please click the following link to reset your password: ${resetToken}`,
    };

    return transporter.sendMail(mailOptions);
  }

  const { email } = req.body;

  // Generate a JWT token for password reset
  const resetToken = generateToken({ email });

  // Send the password reset link to the user's email
  const sendMail = await sendPasswordResetEmail(email, resetToken);

  res.json({ message: "Password reset email sent", data: sendMail });
};
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        console.error(err);
        res.status(400).json({ message: "Invalid or expired token" });
      } else {
        // Update the user's password in your database
        const { email } = decoded;
        const hashedPassword = bcrypt.hashSync(newPassword, 10);

        const user = await User.findOneAndUpdate(
          { email },
          { password: hashedPassword },
          { new: true }
        );
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "Password reset successful", data: user });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  register,
  login,
  currentUser,
  forgotPassword,
  resetPassword,
};
