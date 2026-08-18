import express from "express"

import { getProfile, login, logout, register } from "../controllers/authController.js";
import { protect } from "../middlewares/auth.js";
import validate from "../middlewares/validate.js";
import { loginSchema, registerSchema } from "../validators/authValidation.js";


const router = express.Router();


router.post("/register",validate(registerSchema),register);
router.post("/login",validate(loginSchema),login);

router.post("/logout",logout);



router.get("/me",protect,getProfile);



export default router;