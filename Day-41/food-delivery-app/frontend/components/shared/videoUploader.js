"use client";

import { useState } from "react";

// A single-video picker with preview playback.
// Reports the selected File (or null) up to the parent via onChange.
//
// Usage:
//   <VideoUploader label="Promo Video (optional)" onChange={setSelectedVideo} />
export default function VideoUploader({ label = "Video", onChange }) {
  const [preview, setPreview] = useState(null); // { file, url } or null

  function handleFileChange(e) {
    const file = e.target.files[0];

    if (!file) {
      setPreview(null);
      onChange(null);
      return;
    }

    setPreview({ file, url: URL.createObjectURL(file) });
    onChange(file);
  }

  function removeVideo() {
    setPreview(null);
    onChange(null);
  }

  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input type="file" accept="video/*" onChange={handleFileChange} />

      {preview && (
        <div className="mt-2">
          <video src={preview.url} controls className="w-full rounded-md max-h-40" />
          <button
            type="button"
            onClick={removeVideo}
            className="text-sm text-red-600 mt-1"
          >
            Remove video
          </button>
        </div>
      )}
    </div>
  );
}