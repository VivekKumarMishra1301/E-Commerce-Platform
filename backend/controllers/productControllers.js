import asyncHandler from"express-async-handler";
import productModel from "../models/productModel.js";
import  fs  from "fs";
import slugify from "slugify";

export const createProduct = asyncHandler(async (req, res) => {
    try {
        console.log(req.body)
        const { name, slug, description, price, category, quantity, shipping,photo } = req.body;
        // const { photo } = req.files;
         switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
    //   case photo && photo.size > 1000000:
    //     return res
    //       .status(500)
    //       .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await productModel.create({ name,slug: slugify(name),description,price,category,quantity,shipping,photo});
  
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
    } catch (error) {
        console.log(error);
         res.status(500).send({ 
            success: false,
            error,
            message:'error in Product'
        })
    }
});
export const getProducts = asyncHandler(async (req, res) => {
  try {
    const products = await productModel.find({}).populate('category').limit(12).sort({ createdAt: -1 });
  res.status(201).send({
      success: true,
      message: "Product List",
    products,
      count:products.length,
    });
  } catch (error) {
      console.log(error);
         res.status(500).send({ 
            success: false,
            error,
            message:'error in Product'
        })
  }
});
export const getSingleProduct = asyncHandler(async (req, res) => {
  try {
    console.log('hello');
    const products = await productModel.findOne({slug:req.params.slug}).populate('category').limit(12).sort({ createdAt: -1 });
  res.status(201).send({
      success: true,
      message: "Product List",
    products,
      count:products.length,
    });
  } catch (error) {
      console.log(error);
         res.status(500).send({ 
            success: false,
            error,
            message:'error in Product'
        })
  }
});
export const deleteProduct = asyncHandler(async (req, res) => {
   try {
     await productModel.findByIdAndDelete( req.params.id );
     res.status(201).send({
      success: true,
      message: "Product Deleted successfully",
    
    });
  } catch (error) {
      console.log(error);
         res.status(500).send({ 
            success: false,
            error,
            message:'error in Product'
        })
  }
});




export const updateProduct = asyncHandler(async (req, res) => {
    try {
      const { name, slug, description, price, category, quantity, shipping,photo } = req.body;
      // const { photo } = req.files;
      switch (true) {
        case !name:
          return res.status(400).send({ error: "Name is Required" });
          case !description:
            return res.status(400).send({ error: "Description is Required" });
            case !price:
              return res.status(400).send({ error: "Price is Required" });
      case !category:
        return res.status(400).send({ error: "Category is Required" });
        case !quantity:
          return res.status(400).send({ error: "Quantity is Required" });
          //   case photo && photo.size > 1000000:
          //     return res
          //       .status(500)
          //       .send({ error: "photo is Required and should be less then 1mb" });
        }
        console.log('hhh')

    const products = await productModel.findByIdAndUpdate(req.params.id,{ name,slug: slugify(name),description,price,category,quantity,shipping,photo},{new:true});
  
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
    } catch (error) {
        console.log(error);
         res.status(500).send({ 
            success: false,
            error,
            message:'error in Product'
        })
    }
});


export const productFilterController = asyncHandler(async (req, res) => {
  try {

    const [checked, radio] = req.body;

    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products
    })



    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'error in Product'
    })
  }
});



export const productCountController = asyncHandler(async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'error in Product'
    })
  }
});


export const productListController = asyncHandler(async (req, res) => {
  try {
    const perPage = 1;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel.find({}).select("-photo").skip((page - 1) * perPage).limit(perPage).sort({ createdAt: -1 });
    res.status(200).send({ 
      success: true,
      products
    })

    
  } catch (error) {
     console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'error in Product'
    })
  }
})