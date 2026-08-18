import fs from "fs";
import path from "path";
import Restaurant from "../models/Restaurant.js";
import MenuItem from "../models/MenuItems.js";

async function createMenuItem(req, res, next) {
  try {
    const { name, restaurant, description, price, category } = req.body;
    const restaurantExist = await Restaurant.findById(restaurant);
    console.log("created-menu start")

    if (!restaurantExist) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const imagePaths = (req.files?.images || []).map((file) => `/uploads/${file.filename}`);

    const menuItem = await MenuItem.create({
      restaurant,
      name,
      description,
      price,
      category,
      images: imagePaths,
    });

    return res.status(201).json(menuItem);
  } catch (error) {
    next(error);
  }
}

async function updateMenuItem(req, res, next) {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    const textFields = ["name", "description", "price", "category", "isAvailable"];
    textFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        menuItem[field] = req.body[field];
      }
    });

    if (req.files?.images?.length > 0) {
      const newImagePaths = req.files.images.map((file) => `/uploads/${file.filename}`);
      menuItem.images.push(...newImagePaths);
    }

    await menuItem.save();
    res.json(menuItem);
  } catch (error) {
    next(error);
  }
}

async function deleteMenuItemImage(req, res, next) {
  try {
    const { id } = req.params;
    const { imagePath } = req.body;

    const menuItem = await MenuItem.findById(id);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    menuItem.images = menuItem.images.filter((img) => img !== imagePath);
    await menuItem.save();

    deleteFileFromDisk(imagePath);

    res.json(menuItem);
  } catch (error) {
    next(error);
  }
}

async function deleteMenuItem(req, res, next) {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    menuItem.images.forEach(deleteFileFromDisk);
    await menuItem.deleteOne();

    res.json({ message: "Menu item deleted successfully" });
  } catch (error) {
    next(error);
  }
}

function deleteFileFromDisk(urlPath) {
  if (!urlPath) return;

  const filename = path.basename(urlPath);
  const fullPath = path.join("uploads", filename);
  fs.unlink(fullPath, (err) => {
    if (err && err.code !== "ENOENT") {
      console.error(`Failed to delete file ${fullPath}:`, err.message);
    }
  });
}

export { deleteMenuItem, deleteMenuItemImage, updateMenuItem, createMenuItem };
