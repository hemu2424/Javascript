import express from "express"
import { validate } from "../../middleware/auth/validate.middleware.js";
import { loginSchema, registerSchema } from "../../validations/auth.validations.js";
import { loginuser, registeruser } from "../../controllers/auth/auth.controller.js";
import { authenticate } from "../../middleware/auth/auth.middleware.js";
import { getcurrentUsercontroller } from "../../controllers/auth/user.controller.js";
import { authorize } from "../../middleware/auth/authorize.middleware.js";
import { getUsersadminController } from "../../controllers/auth/admin.controller.js";

const router = express.Router();


router.post(
    "/register",validate(registerSchema),registeruser
)

router.post("/login",validate(loginSchema),loginuser)


router.get("/me",authenticate,getcurrentUsercontroller)

router.get("/admin",authenticate,authorize("admin"),getUsersadminController)

export default router