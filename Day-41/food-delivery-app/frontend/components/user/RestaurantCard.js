"use client";

import Link from "next/link";
import { fileUrl } from "@/lib/fileUrl";


export default function RestaurantCard({ restaurant }) {
  const thumbnail = restaurant.images?.[0]; 

  return (
    <Link
      href={`/user/restaurant/${restaurant._id}`}
      className="block bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="w-full h-40 bg-gray-100">
        {thumbnail ? (
          <img
            src={fileUrl(thumbnail)}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
            No image
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg">{restaurant.name}</h3>
        <p className="text-sm text-gray-500">{restaurant.cuisine}</p>
        {restaurant.description && (
          <p className="text-sm text-gray-400 mt-1 line-clamp-2">{restaurant.description}</p>
        )}
      </div>
    </Link>
  );
}