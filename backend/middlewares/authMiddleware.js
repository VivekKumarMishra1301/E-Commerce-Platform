import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js';
export const protect = async (req, res, next) => {
    try {
        // console.log(req.headers)
        const decode = await jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Suspicious request',
            error: error,
        });
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        // console.log(user)
        if (user.role !== 1) {
            return res.status(401).send({
                success: false,
                message:'unauthorized access'
            })
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
         res.status(401).send({
            success: false,
            message: 'Admin Role Denied',
            error: error,
        });
    }
}