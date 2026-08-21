"use client";

import { useEffect } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import OrderStatusBadge from "@/components/user/OrderStatusBadge";
import { useOrders } from "@/context/OrderContext";

export default function MyOrdersPage() {
  const { myOrders, loading, error, fetchMyOrders } = useOrders();

  useEffect(() => {
    fetchMyOrders();
  }, [fetchMyOrders]);

  return (
    <ProtectedRoute allowedRoles={["user"]}>
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {loading && <p className="text-gray-400">Loading orders...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && myOrders.length === 0 && (
        <p className="text-gray-400">You haven't placed any orders yet.</p>
      )}

      <div className="space-y-3 max-w-lg">
        {myOrders.map((order) => (
          <Link
            key={order._id}
            href={`/user/orders/${order._id}`}
            className="block bg-white border rounded-lg p-4 hover:shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{order.restaurant?.name}</p>
                <p className="text-xs text-gray-400">
                  {new Date(order.createdAt).toLocaleDateString()} · ₹{order.totalAmount}
                </p>
              </div>
              <OrderStatusBadge status={order.status} />
            </div>
          </Link>
        ))}
      </div>
    </ProtectedRoute>
  );
}