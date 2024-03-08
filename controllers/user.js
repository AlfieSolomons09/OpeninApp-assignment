import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from "../models/user.js";

// to login an already authenticated user
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user) return res.status(404).json({
            success: false,
            message: "Invalid Email or Password"
        })

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(404).json({
            success: false,
            message: "Invalid Email or Password"
        })

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)

        res.status(200).cookie("token", token, {
            httpOny: true,
            maxAge: 150 * 60 * 1000,
        }).json({
            success: true,
            message: `Welcome Back, ${user.name}`,
        })
    } catch (error) {
        throw new Error(error);
    }
}

// to register a new user
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });

        if (user) return res.status(404).json({
            success: false,
            message: "User already exists"
        })

        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({ name, email, password: hashedPassword })

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)

        res.status(201).cookie("token", token, {
            httpOny: true,
            maxAge: 15 * 60 * 1000,
        }).json({
            success: true,
            message: "Registered Successfully",
        })
    } catch (error) {
        throw new Error(error);
    }
}

// to get user details
export const getMyProfile = (req, res) => {
    try {
        res.status(200).json({
            success: true,
            user: req.user,
        })
    } catch (error) {
        throw new Error(error);
    }
}

export const logout = (req, res) => {
    try {
        res.status(200).cookie("token", "", { expires: new Date(Date.now()) }).json({
            success: true,
            message: "logged out successfully"
        })
    } catch (error) {
        throw new Error(error);
    }
}