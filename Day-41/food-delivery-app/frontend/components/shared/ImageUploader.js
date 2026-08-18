"use client";

import { useState } from "react";

// A reusable multi-image picker with preview thumbnails.
// Parent components pass an onChange callback to receive the selected File[] array.
//
// Usage:
//   <ImageUploader label="Images (up to 5)" maxCount={5} onChange={setSelectedImages} />
export default function ImageUploader({ label = "Images", maxCount = 5, onChange }) {
  const [previews, setPreviews] = useState([]); // array of { file, url }

  function handleFileChange(e) {
    const files = Array.from(e.target.files);

    if (files.length > maxCount) {
      alert(`You can only select up to ${maxCount} images.`);
      return;
    }

    const newPreviews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setPreviews(newPreviews);
    onChange(files); // report the raw File[] array up to the parent
  }

  function removeImage(indexToRemove) {
    const updatedPreviews = previews.filter((_, index) => index !== indexToRemove);
    setPreviews(updatedPreviews);
    onChange(updatedPreviews.map((p) => p.file)); // keep parent in sync
  }

  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input type="file" accept="image/*" multiple onChange={handleFileChange} />

      {previews.length > 0 && (
        <div className="flex gap-2 mt-2 flex-wrap">
          {previews.map((preview, index) => (
            <div key={index} className="relative">
              <img
                src={preview.url}
                alt="preview"
                className="w-16 h-16 object-cover rounded-md border"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-red-600 text-white w-5 h-5 rounded-full text-xs"
              >
                REMOVE
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}