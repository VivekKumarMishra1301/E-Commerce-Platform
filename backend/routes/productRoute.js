import express from 'express'
import { isAdmin, protect } from '../middlewares/authMiddleware.js';
import { createProduct, deleteProduct, getProducts, getSingleProduct, productCountController, productFilterController, productListController, updateProduct } from '../controllers/productControllers.js';
import formidable from 'formidable';

const router = express.Router();

router.post('/create-product',protect,isAdmin,createProduct);
router.get('/get-product', getProducts);
router.get('/get-product/:slug', getSingleProduct);
router.delete('/delete-product/:id',deleteProduct);
router.put('/update-product/:id',protect,isAdmin,updateProduct);
router.post('/product-filters', productFilterController);
router.get('/product-count',productCountController);
router.get('/product-list/:page', productListController);
export default router;