import userModel from '../models/userModel.js'
import { comparePassword, hashPassword } from '../utils/authHelper.js';
import asyncHandler from 'express-async-handler'
import JWT from 'jsonwebtoken'
export const registerController = asyncHandler(async (req, res) => {
    try {
        console.log(req.body)
        const { name, email, password, phone, address, role } = req.body;
        if (!name || !email || !password || !phone || !address || !role) {
            return res.send({ error: 'Enter every Field Details' });
        }
        const user = await userModel.findOne({ email: email });
        if (user) {
            return res.status(200).send({
                success: true,
                message: 'Email already exists'
            });
        }
        const hashedPassword = await hashPassword(password);
        const newUser = await userModel.create({ name: name, email: email, password: hashedPassword, phone: phone, address: address, role: role });
        res.status(200).send({
            success: true,
            message: 'User Registered SuccessFully',
            user: newUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error in registration',
            error: error,
        })
    }
});


export const loginController = asyncHandler(async (req, res) => {
    try {
        console.log(req.body)
        const { email, password } = req.body;
        if (!email || !password) {
            return res.send({ error: 'Enter every Field Details' });
        }
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(404).send({
            success: false,
            message: 'Email is not registered',
            error: error,
        })
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
           return res.status(404).send({
                success: false,
                message: 'Incorrect Password',
                error: error,
            });
        }
        // Token Creation
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET,{
            expiresIn:'7d'
        });
        res.status(200).send({
            success: true,
            message: 'Now YOu are logged in',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error in login',
            error: error,
        })
    }
});