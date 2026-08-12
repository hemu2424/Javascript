import express from "express"
import authRoutes from "./routes/auth/auth.routes.js"
import product from "./routes/product/product.routes.js";

const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.json({
        success:true,
        message:"welcome to mye"

    })
})

app.use("/api/auth",authRoutes)
app.use("/api/products",product)

export default app