const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const register = asyncHandler(async (req, res) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;
    if (!firstName || !lastName || !username || !email || !password) {
      res.status(400);
      throw new Error("All fields are required");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400);
      throw new Error("User already exists, please login");
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
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const user = await User.findOne({ username });
 
  if (username && (bcrypt.compareSync(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          password: user.password,
          id: user.id,
        },
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "2h" }
    );
    res.status(200).json({
      message: "User successfully logged in",
      token: accessToken,
      data: user,
    });
  } else {
    res.status(400);
    throw new Error("Username or Password is incorrect");
  }
 
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
});
const currentUser= (req, res) => {
    try {
        res.status(200).json({ message: "User Successfully fetched", data: req.user});
    } catch (error) {
        console.log(error);
    }
        
      }


module.exports = { register, login, currentUser };
