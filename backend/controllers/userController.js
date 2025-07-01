const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 
const validator = require('validator');

const createToken = (id) => {
    if (!process.env.JWT_TOKEN_SECRET) {
        console.error("❌ JWT_TOKEN_SECRET is not defined in your .env file.");
        throw new Error("JWT token secret missing");
    }
    return jwt.sign({ id }, process.env.JWT_TOKEN_SECRET);
};

// 🔐 Login Controller
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user)
            return res.status(400).json({ message: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid email or password" });

        const token = createToken(user._id);
        res.status(200).json({ token });

    } catch (error) {
        console.error("🔴 Login Error:", error); // Shows full error stack
        res.status(500).json({ message: "Internal server error" });
    }
};

// 📝 Register Controller
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const exists = await userModel.findOne({ email });
        if (exists)
            return res.status(400).json({ message: "Email already exists" });

        if (!validator.isEmail(email))
            return res.status(400).json({ message: "Invalid Email" });

        if (password.length < 8)
            return res.status(400).json({
                message: "Password must be at least 8 characters long"
            });

        const hashedPassword = await bcrypt.hash(password, 10);
        await userModel.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error("🔴 Register Error:", error); // Shows full error stack
        res.status(500).json({ message: "Internal server Error" });
    }
};

module.exports = { loginUser, registerUser };
