import express from "express"
import { allowRoles, protect } from "../middlewares/auth.js";
import {
  createRestaurant,
  deleteRestaurant,
  deleteResturantImage,
  getRestaurantById,
  getRestaurants,
  updateRestaurant,
} from "../controllers/restaurantController.js";
import {
  createRestaurantSchema,
  updateRestaurantSchema,
} from "../validators/resturantValidation.js";
import upload from "../middlewares/upload.js";
import validate from "../middlewares/validate.js";

const router = express.Router();

const uploadRestaurantFiles = upload.fields([
  { name: "images", maxCount: 5 },
  { name: "video", maxCount: 1 },
]);

router.get("/",getRestaurants);
router.get("/:id",getRestaurantById);

router.post("/", protect, allowRoles("admin"), uploadRestaurantFiles, validate(createRestaurantSchema), createRestaurant);

router.put(
  "/:id",
  protect,
  allowRoles("admin"),
  uploadRestaurantFiles,
  validate(updateRestaurantSchema),
  updateRestaurant
);

router.delete("/:id/images", protect, allowRoles("admin"), deleteResturantImage);

router.delete("/:id", protect, allowRoles("admin"), deleteRestaurant);

export default router