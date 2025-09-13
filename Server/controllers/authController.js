import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

//register user
const Register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        let user = await prisma.user.findUnique({
            where: { email }
        });

        if (user) {
<<<<<<< HEAD
            return res.status(400).json({ message: "User already exists" });
=======
            return res.status(400).json({ message: 'user already exists' });
>>>>>>> 5982ca971e45a63ebc7d47a2b8c59e1ef4ea2ceb
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        });

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(201).json({
<<<<<<< HEAD
            message: "User registered successfully",
=======
            message: 'user registered successfully',
>>>>>>> 5982ca971e45a63ebc7d47a2b8c59e1ef4ea2ceb
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
<<<<<<< HEAD
        console.error("Register error:", error);
        res.status(500).json({ message: "Server error during registration" });
    }
};

//Login
=======
        console.error('register error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

//login user
>>>>>>> 5982ca971e45a63ebc7d47a2b8c59e1ef4ea2ceb
const Login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
<<<<<<< HEAD
            return res.status(404).json({ message: "User not found" });
=======
            return res.status(404).json({ message: 'user not found' });
>>>>>>> 5982ca971e45a63ebc7d47a2b8c59e1ef4ea2ceb
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export { Register, Login };

// const User = require('../models/User.js');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// // Register
// const Register = async (req, res) => {
//     const { username, email, password } = req.body;

//     try {
//         let user = await User.findOne({ email });
//         if (user) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         user = new User({ username, email, password });
//         user.password = await bcrypt.hash(password, 10);
//         await user.save();

//         const token = jwt.sign(
//             { id: user._id },
//             process.env.JWT_SECRET,
//             { expiresIn: '1h' }
//         );

//         res.status(201).json({
//             message: 'User registered successfully',
//             token,
//             user: {
//                 id: user._id,
//                 username: user.username,
//                 email: user.email
//             }
//         });
//     } catch (error) {
//         console.error('Register error:', error);
//         res.status(500).json({ message: 'Server error during registration' });
//     }
// };

// // Login
// const Login = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         const token = jwt.sign(
//             { id: user._id },
//             process.env.JWT_SECRET,
//             { expiresIn: '1h' }
//         );

//         return res.status(200).json({
//             message: 'Login successful',
//             token,
//             user: {
//                 id: user._id,
//                 username: user.username,
//                 email: user.email
//             }
//         });
//     } catch (error) {
//         console.error( error.message);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// module.exports = { Register, Login };
