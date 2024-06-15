const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../model/User");

const userCtrl = {
  //!Register
  register: asyncHandler(async (req, res) => {
    const { username, password, school, interest } = req.body;
    console.log({ username, password, school, interest});
    //!Validations
    if (!username || !password || !school || !interest) {
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
    });
    //!Send the response
    console.log("userCreated", userCreated);
    res.json({
      password: userCreated.password,
      username: userCreated.username,
      school: userCreated.school,
      interest: userCreated.interest,
      id: userCreated.id,
    });
  }),
  //!Login
  login: asyncHandler(async (req, res) => {
    const { username, password, interest, school } = req.body;
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
    const token = jwt.sign({ id: user._id }, "anyKey", { expiresIn: "30d" });
    //!Send the response
    res.json({
      message: "Login success",
      token,
      id: user._id,
      school: user.school,
      interest: user.interest,
      username: user.username,
    });
  }),
  //!Profile
  profile: asyncHandler(async (req, res) => {
    //Find the user
    const user = await User.findById(req.user).select("-password");
    res.json({ user });
  }),
};
module.exports = userCtrl;
