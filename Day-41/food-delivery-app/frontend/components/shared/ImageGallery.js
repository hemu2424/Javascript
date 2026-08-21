"use client";

import { fileUrl } from "@/lib/fileUrl";


export default function ImageGallery({ images, onDelete }) {
  if (!images || images.length === 0) return null;

  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mt-3">
      {images.map((imagePath) => (
        <div key={imagePath} className="relative rounded-md overflow-hidden bg-gray-50">
          <img
            src={fileUrl(imagePath)}
            alt="uploaded"
            className="w-full h-24 object-cover transform transition-transform hover:scale-105"
          />
          <button
            type="button"
            onClick={() => onDelete(imagePath)}
            className="absolute top-2 right-2 bg-red-600 text-white w-7 h-7 rounded-full text-xs opacity-0 hover:opacity-100 transition-opacity"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}