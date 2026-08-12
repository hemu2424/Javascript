

export const getcurrentUsercontroller = (req,res,next)=>{
return res.status(201).json({
    success:true,
    message:"protected route",
    user:req.user

})
}