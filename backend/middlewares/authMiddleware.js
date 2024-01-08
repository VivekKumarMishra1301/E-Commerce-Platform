import JWT from 'jsonwebtoken'
import userModel from '../models/userModel';
export const protect = async (req, res, next) => {
    try {
        const decode = await JWT.verify(req.headers.authorization, process.env.SECRET_KEY);
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