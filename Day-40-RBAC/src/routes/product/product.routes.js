import express from "express"
import { authenticate } from "../../middleware/auth/auth.middleware.js";
import { authorize } from "../../middleware/auth/authorize.middleware.js";
import { createproduct, deleteproduct, getallproducts, getsingleproduct, updateproduct } from "../../controllers/product/product.controller.js";
import { productvaliadtion } from "../../middleware/products/validate.schema.js";
import { createProductSchema } from "../../middleware/products/validation.middleware.js";

const router = express.Router()

router.get("/", authenticate, getallproducts);
router.get("/:id", authenticate, getsingleproduct);

router.post("/admin/create", authenticate, authorize("admin"), productvaliadtion(createProductSchema), createproduct);

router.patch("/admin/update:id",authorize("admin"),productvaliadtion(createProductSchema), updateproduct);
router.delete("/admin/delete:id", deleteproduct);

export default router