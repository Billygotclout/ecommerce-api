const bcrypt = require("bcrypt");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { userSchema } = require("../helpers/validation");
const CustomError = require("../utils/CustomError");
const sendMail = require("../helpers/mailer");
const logger = require("../helpers/logger");
const dotenv = require("dotenv").config();
const register = asyncHandler(async (req, res, next) => {
  try {
    const { firstName, lastName, username, email, password, role } = req.body;
    const { error } = userSchema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessage = error.details[0].message;

      logger.error(errorMessage);
      throw new CustomError(errorMessage, 400);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      logger.error("User already exists");
      throw new CustomError("User already exists, please log in", 400);
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      password: hashPassword,
      role,
    });
    logger.info(`User '${username}' successfully registered.`);
    res.status(201).json({
      message: "User successfully created",
      data: user,
    });
  } catch (error) {
    logger.error(`Error during user registration: ${error.message}`);
    next(error.message);
  }
});
const login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  try {
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
          process.env.TOKEN_SECRET
        );
        logger.info(`User '${username}' successfully logged in.`);
        res.status(200).json({
          message: "User successfully logged in",
          token: accessToken,
          data: user,
        });
      } else {
        logger.error(
          `Failed login attempt for user '${username}': Incorrect password.`
        );
        throw new CustomError(
          "Please double-check your password and try again",
          400
        );
      }
    } else {
      logger.error(
        `Login attempt failed for user '${username}': User not found.`
      );
      throw new CustomError("Sorry we couldn't find that user", 404);
    }
  } catch (error) {
    next(error);
  }
});
const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      logger.info(`User '${user.username}' successfully fetched.`);
      res
        .status(200)
        .json({ message: "User successfully fetched", data: user });
    } else {
      logger.error(
        `User with ID '${req.user.id}' not found during current user retrieval.`
      );
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    logger.error(`Error during current user retrieval: ${error.message}`);
    console.error(error);
  }
};
const forgotPassword = async (req, res) => {
  function generateToken(payload) {
    return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "1h" });
  }
  const { email } = req.body;
  // Generate a JWT token for password reset
  const resetToken = generateToken({ email });

  logger.info(`Password reset token generated for email: ${email}`);
  // Send the password reset link to the user's email
  const sendPasswordMail = await sendMail(
    email,
    "Password Reset",
    `Please click the following link to reset your password: ${resetToken}`
  );
  logger.info(`Password reset email sent to email: ${email}`);
  res.json({ message: "Password reset email sent", data: sendPasswordMail });
};
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        logger.error(`Token verification failed: ${err}`);
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
          logger.error(
            `User not found during password reset for email: ${email}`
          );
          return res.status(404).json({ message: "User not found" });
        }
        logger.info(`Password reset successful for email: ${email}`);
        res.json({ message: "Password reset successful", data: user });
      }
    });
  } catch (error) {
    logger.error(`Error during password reset: ${error.message}`);
    console.error(error);
  }
};

module.exports = {
  register,
  login,
  currentUser,
  forgotPassword,
  resetPassword,
};
