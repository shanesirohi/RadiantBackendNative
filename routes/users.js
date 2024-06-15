//routes/users.js
const express = require("express");
const userCtrl = require("../controller/user");
const isAuthenticated = require("../middlewares/isAuth");

const router = express.Router();

//!Register
router.post("/api/users/register", userCtrl.register);
router.post("/api/users/login", userCtrl.login);
router.get("/api/users/profile", isAuthenticated, userCtrl.profile);
router.get("/api/users/getUsers", userCtrl.getUsers);
router.get("/api/users/getPosts", userCtrl.getUsers);
module.exports = router;
