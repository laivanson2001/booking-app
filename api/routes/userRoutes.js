const express = require("express");
const {
    registerUser,
    loginUser,
    getUser,
    logoutUser,
} = require("../controllers/userControllers");

const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.post("/logout", logoutUser);
userRoutes.get("/profile", getUser);

module.exports = userRoutes;
