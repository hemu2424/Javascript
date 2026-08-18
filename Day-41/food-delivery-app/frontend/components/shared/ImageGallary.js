"use client";

import { fileUrl } from "@/lib/fileUrl";

// Displays images that are ALREADY saved on the server (not local previews).
// Each image has a delete button that calls onDelete(imagePath) — 
// the parent decides what API call that triggers (restaurant vs menu item delete differs).
//
// Usage:
//   <ImageGallery images={restaurant.images} onDelete={(path) => deleteRestaurantImage(restaurant._id, path)} />
export default function ImageGallery({ images, onDelete }) {
  if (!images || images.length === 0) return null;

  return (
    <div className="flex gap-2 flex-wrap mt-3">
      {images.map((imagePath) => (
        <div key={imagePath} className="relative">
          <img
            src={fileUrl(imagePath)}
            alt="uploaded"
            className="w-20 h-20 object-cover rounded-md border"
          />
          <button
            type="button"
            onClick={() => onDelete(imagePath)}
            className="absolute -top-2 -right-2 bg-red-600 text-white w-5 h-5 rounded-full text-xs"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}