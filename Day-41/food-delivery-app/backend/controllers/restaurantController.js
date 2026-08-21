import Restaurant from "../models/Restaurant.js";
import MenuItem from "../models/MenuItems.js";
import path from "path";
import fs from "fs";



async function getCuisines(req, res, next) {
  try {

    const cuisines = await Restaurant.distinct("cuisine", {
      isActive: true,
      cuisine: { $nin: [null, ""] },
    });

    res.json(cuisines.sort());
  } catch (error) {
    next(error);
  }
}
async function getRestaurants(req, res, next) {
  try {
    const { search, cuisine } = req.query;

   
    const filter = { isActive: true };

    if (search) {
 
      filter.name = { $regex: search, $options: "i" };
    }

    if (cuisine) {
      filter.cuisine = { $regex: cuisine, $options: "i" };
    }

    const restaurants = await Restaurant.find(filter).sort({ createdAt: -1 });
    res.json(restaurants);
  } catch (error) {
    next(error);
  }
}

async function getRestaurantById(req, res, next) {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const menuItems = await MenuItem.find({
      restaurant: restaurant._id,
      isAvailable: true,
    });

    res.json({ restaurant, menuItems });
  } catch (error) {
    next(error);
  }
}

async function createRestaurant(req, res, next) {
  try {
    const { name, description, cuisine, address } = req.body;

    const imagePaths = (req.files?.images || []).map((file) => `/uploads/${file.filename}`);
    const videoPath = req.files?.video?.[0] ? `/uploads/${req.files.video[0].filename}` : null;

    const restaurant = await Restaurant.create({
      name,
      description,
      cuisine,
      address,
      images: imagePaths,
      video: videoPath,
    });

    res.status(201).json(restaurant);
  } catch (error) {
    next(error);
  }
}

async function updateRestaurant(req, res, next) {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const textFields = ["name", "description", "cuisine", "address", "isActive"];
    textFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        restaurant[field] = req.body[field];
      }
    });

    if (req.files?.images?.length > 0) {
      const newImagesPath = req.files.images.map((file) => `/uploads/${file.filename}`);
      restaurant.images.push(...newImagesPath);
    }

    if (req.files?.video?.[0]) {
      if (restaurant.video) {
        deleteFromDisk(restaurant.video);
      }
      restaurant.video = `/uploads/${req.files.video[0].filename}`;
    }

    await restaurant.save();
    res.json(restaurant);
  } catch (error) {
    next(error);
  }
}

async function deleteRestaurantImage(req, res, next) {
  try {
    const { id } = req.params;
    const { imagePath } = req.body;

    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    restaurant.images = restaurant.images.filter((img) => img !== imagePath);
    if (restaurant.video === imagePath) {
      restaurant.video = null;
    }

    await restaurant.save();
    deleteFromDisk(imagePath);
    res.json(restaurant);
  } catch (error) {
    next(error);
  }
}
async function deleteRestaurant(req, res, next) {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const menuItems = await MenuItem.find({ restaurant: restaurant._id });

    menuItems.forEach((item) => {
      item.images.forEach(deleteFromDisk);
    });

    restaurant.images.forEach(deleteFromDisk);
    if (restaurant.video) deleteFromDisk(restaurant.video);

    await MenuItem.deleteMany({ restaurant: restaurant._id });
    await restaurant.deleteOne();

    res.json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    next(error);
  }
}

function deleteFromDisk(urlPath) {
  if (!urlPath) return;

  const filename = path.basename(urlPath);
  const fullPath = path.join("uploads", filename);

  fs.unlink(fullPath, (err) => {
    if (err && err.code !== "ENOENT") {
      console.error(`Failed to delete file ${fullPath}:`, err.message);
    }
  });
}

export {
  getRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurantImage,
  deleteRestaurant,getCuisines
};
