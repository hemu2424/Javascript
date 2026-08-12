import Product from "../../models/Products.js"

export const getallproducts = async(req,res,next)=>{
    
    try{
        const products = await Product.find();

        if(!products){
            return res.status(401).json({
                success:false,
                message:"no products are availble"

            })
        }
        return res.status(200).json({
            success:true,
            message:"all products are fetched",
            product:products
        })

    }
    catch(error){
        console.log(error)
    }

    

}



export const getsingleproduct = async(req,res,next)=>{
    try{
        const product = await Product.findById(req.params.id)

        if(!product){
            return res.status(404).json({
                success:false,
                message:"product not available"
            })
        }
        return res.status(200).json({
            success:true,
            message:"product is fetched",
            product
        })

    }
    catch(error){
        console.log(error)
        next(error)
    }
}

export const createproduct = async (req, res, next) => {
    try {
        const newproduct = await Product.create(req.body);

        return res.status(201).json({
            success: true,
            messaage: "product created",
            newproduct,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const updateproduct = async(req,res,next)=>{

    try{
        const updatedproduct = await Product.findByIdAndUpdate( { _id: req.params.id },
  { $set: req.body },
  { new: true, runValidators: true })

    }
    catch(error){
        console.log(error);
        next(error)
    }

}

export const deleteProductController = async (
  req,
  res,
  next
) => {
  try {
    const product = await deleteProduct(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
