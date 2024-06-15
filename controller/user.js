//controller/user.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../model/User");
const Post = require('../model/Post');
const userCtrl = {
  //!Register
  register: asyncHandler(async (req, res) => {
    const { username, password, school, interest, specificInterest } = req.body;
    console.log({ username, password, school, interest, specificInterest});
    //!Validations
    if (!username || !password || !school || !interest || !specificInterest) {
      throw new Error("Please all fields are required");
    }
    //! check if user already exists
    const userExits = await User.findOne({ username });
    // console.log("userExits", userExits);
    if (userExits) {
      throw new Error("User already exists, please find a new username");
    }
    //! Hash the user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //!Create the user
    const userCreated = await User.create({
      password: hashedPassword,
      username,
      school,
      interest,
      specificInterest,
    });
    //!Send the response
    console.log("userCreated", userCreated);
    res.json({
      password: userCreated.password,
      username: userCreated.username,
      school: userCreated.school,
      interest: userCreated.interest,
      specificInterest: userCreated.specificInterest,
      id: userCreated.id,
    });
  }),
  //!Login
  login: asyncHandler(async (req, res) => {
    const { username, password, interest, school, specificInterest } = req.body;
    //!Check if user email exists
    const user = await User.findOne({ username });
    console.log("user backend", user);
    if (!user) {
      throw new Error("Invalid credentials");
    }
    //!Check if user password is valid
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }
    //! Generate the token
    const token = jwt.sign({ id: user._id }, "anyKey", { expiresIn: "10d" });
    //!Send the response
    res.json({
      message: "Login success",
      token,
      id: user._id,
      school: user.school,
      interest: user.interest,
      username: user.username,
      specificInterest: user.specificInterest,
    });
  }),
  getUsers: asyncHandler(async (req, res) => {
    try {
      const users = await User.find().select("-password");
      res.json(users); // Return array of users directly
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  }),
  getPosts: asyncHandler(async (req, res) => {
    try {
      const posts = await Post.find();
      res.json(posts); // Return array of posts directly
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  }),
  addPost: async (req, res) => {
    const { user, image, caption } = req.body;
    try {
      const newPost = await Post.create({
        user,
        image,
        caption,
      });
      res.status(201).json(newPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  },
  //!Profile
  profile: asyncHandler(async (req, res) => {
    const user = await User.findById(req.user).select("-password");
    res.json({ user });
  }),
};
module.exports = userCtrl;
