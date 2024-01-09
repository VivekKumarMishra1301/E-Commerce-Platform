import express from "express";
import {registerController,loginController, forgotPasswordController} from '../controllers/authController.js'
import { isAdmin, protect } from "../middlewares/authMiddleware.js";
const router = express.Router();


router.post('/register', registerController);
router.post('/login', loginController);
router.post('/forgot-password',forgotPasswordController);
router.get('/user-auth', protect, (req, res) => {
    res.status(200).send({ok: true});
})
router.get('/admin-auth', protect,isAdmin, (req, res) => {
    res.status(200).send({ok: true});
})
export default router;