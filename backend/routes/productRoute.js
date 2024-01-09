import express from 'express'
import { isAdmin, protect } from '../middlewares/authMiddleware.js';
import { createProduct } from '../controllers/productControllers.js';
import formidable from 'formidable';

const router = express.Router();

router.post('/create-product',protect,isAdmin,createProduct);
export default router;