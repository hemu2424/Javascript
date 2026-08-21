"use client";

import { Suspense, useEffect } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRestaurants } from "@/context/RestaurantContext";
import RestaurantCard from "@/components/user/RestaurantCard";
import RestaurantCardSkeleton from "@/components/shared/RestaurantCardSkeleton";
import RestaurantSearchBar from "@/components/user/RestaurantSearchBar";

export default function UserDashboardPage() {
  const { restaurants, loading, error, fetchRestaurants } = useRestaurants();

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  return (
    <ProtectedRoute allowedRoles={["user"]}>
     <Suspense fallback={<div className="h-10 mb-6" />}>
  <RestaurantSearchBar />
</Suspense>
      <h1 className="text-2xl font-bold mb-6">Restaurants near you</h1>

      {error && <p className="text-red-600">{error}</p>}
      {!loading && restaurants.length === 0 && (
        <p className="text-gray-400">No restaurants available right now.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <RestaurantCardSkeleton key={i} />)
          : restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            ))}
      </div>
    </ProtectedRoute>
  );
}