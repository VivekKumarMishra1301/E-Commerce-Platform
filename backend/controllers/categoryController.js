import asyncHandler from "express-async-handler";
import categoryModel from '../models/categoryModel.js'
import slugify from "slugify";

export const createCategoryController = asyncHandler(async (req, res) => {
    try {
        console.log(req.body);
        const { name } = req.body;
        if (!name) {
            return res.status(401).send({ message: 'Name is required' });

        }
        const existing = await categoryModel.findOne({ name });
        if (existing) {
            return res.status(200).send({success:false, message: 'Category Already exists'})
        }
        const category = await categoryModel.create({ name, slug: slugify(name) });
        res.status(201).send({success:true, message:'category created successfully',category})
    } catch (error) {
        console.log(error)
        res.status(500).send({ 
            success: false,
            error,
            message:'error in category'
        })
    }
});
export const updateCategoryController = asyncHandler(async (req, res) => {
    try{
    const { name } = req.body;

    const { id } = req.params;

        if (!name) {
            return res.status(401).send({ message: 'Name is required' });

    }
    if (!id) {
            return res.status(401).send({ message: 'No id detected' });

        }
        const category=await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
        res.status(201).send({success:true, message:'category updated successfully',category})
    } catch (error) {
        console.log(error)
        res.status(500).send({ 
            success: false,
            error,
            message:'error in category'
        })
    }
});
export const getCategoryController = asyncHandler(async (req, res) => {
    try {
        const category = await categoryModel.find({});
        res.status(201).send({
            success: true,
            message: 'all category list',
            category
        })
       } catch (error) {
        console.log(error)
        res.status(500).send({ 
            success: false,
            error,
            message:'error in category'
        })
    }
});
export const singleCategoryController = asyncHandler(async (req, res) => {
    try {
        const { slug } = req.params;

        const category = await categoryModel.findOne({slug});
        res.status(201).send({
            success: true,
            message: 'Single category list',
            category
        })
       } catch (error) {
        console.log(error)
        res.status(500).send({ 
            success: false,
            error,
            message:'error in category'
        })
    }
});
export const deleteCategoryController = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        await categoryModel.findByIdAndDelete({_id:id});
        res.status(201).send({
            success: true,
            message: 'category deleted',
            
        })
       } catch (error) {
        console.log(error)
        res.status(500).send({ 
            success: false,
            error,
            message:'error in category'
        })
    }
});