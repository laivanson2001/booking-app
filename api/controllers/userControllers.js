const generateToken = require("../config/generateToken");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin" });
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
        res.status(400).json({ message: "Người dùng đã tồn tại" });
    }

    const user = await User.create({ name, email, password });

    if (user) {
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(500).json({ message: "Có lỗi xảy ra" });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin" });
    }
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.status(201)
            .cookie(
                "token",
                generateToken({
                    id: user._id,
                    email: user.email,
                    name: user.name,
                })
            )
            .json({
                id: user._id,
                name: user.name,
                email: user.email,
            });
    } else {
        res.status(401).json({ message: "Email hoặc mật khẩu không đúng" });
    }
};

const getUser = async (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, userData) => {
            if (err) throw err;
            res.json(userData);
        });
    } else {
        res.json(null);
    }
};

const logoutUser = (req, res) => {
    res.cookie("token", "").json({ message: "Đăng xuất thành công" });
};

module.exports = { registerUser, loginUser, getUser, logoutUser };
