import express from 'express'
import { isAdmin, protect } from '../middlewares/authMiddleware.js';
import { createCategoryController, deleteCategoryController, getCategoryController, singleCategoryController, updateCategoryController } from '../controllers/categoryController.js';
const router = express.Router();



router.post('/create-category',protect,isAdmin,createCategoryController)
router.put('/update-category/:id',protect,isAdmin,updateCategoryController)
router.get('/get-category',getCategoryController)
router.get('/single-category/:slug',singleCategoryController)
router.delete('/delete-category/:id', protect, isAdmin, deleteCategoryController);
export default router