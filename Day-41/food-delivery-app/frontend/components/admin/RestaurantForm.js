"use client";

import { useState } from "react";
import { useRestaurants } from "@/context/RestaurantContext";
import ImageUploader from "@/components/shared/ImageUploader";
import VideoUploader from "@/components/shared/videoUploader";

// Renders the "create restaurant" form. Calls onSuccess() after a successful create,
// so the parent page can decide what happens next (e.g. hide the form).
export default function RestaurantForm({ onSuccess }) {
  const { createRestaurant } = useRestaurants();

  const [formData, setFormData] = useState({ name: "", cuisine: "", description: "", address: "" });
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleTextChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("cuisine", formData.cuisine);
      data.append("description", formData.description);
      data.append("address", formData.address);

      selectedImages.forEach((file) => data.append("images", file));
      if (selectedVideo) {
        data.append("video", selectedVideo);
      }

      await createRestaurant(data);

      setFormData({ name: "", cuisine: "", description: "", address: "" });
      setSelectedImages([]);
      setSelectedVideo(null);
      onSuccess?.();
    } catch (err) {
      setError(err.response?.data?.message || "Could not create restaurant.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-4 mb-6 max-w-md space-y-3">
      <input
        name="name"
        required
        placeholder="Restaurant name"
        value={formData.name}
        onChange={handleTextChange}
        className="w-full border rounded-md px-3 py-2"
      />
      <input
        name="cuisine"
        placeholder="Cuisine"
        value={formData.cuisine}
        onChange={handleTextChange}
        className="w-full border rounded-md px-3 py-2"
      />
      <input
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleTextChange}
        className="w-full border rounded-md px-3 py-2"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleTextChange}
        className="w-full border rounded-md px-3 py-2"
      />

      <ImageUploader label="Images (up to 5)" maxCount={5} onChange={setSelectedImages} />
      <VideoUploader label="Promo Video (optional)" onChange={setSelectedVideo} />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm disabled:opacity-50"
      >
        {isSubmitting ? "Uploading..." : "Create Restaurant"}
      </button>
    </form>
  );
}