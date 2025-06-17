"use client";

import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

type Order = {
  id: number;
  item: string;
  address: string;
  status: string;
  date: string;
};

const UserRecentOrders = () => {
  const [pastOrders, setPastOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchPastOrders = async () => {
      const session = await getSession();
      if (!session?.user?.id) {
        console.error("No user ID found in session");
        return;
      }

      try {
        const res = await fetch(`/api/bookings?userId=${session.user.id}`);
        const json = await res.json();

        if (!res.ok) throw new Error(json.message || "Failed to fetch");

        const now = new Date();

        const past = (json.bookings || [])
          .filter((booking: any) => new Date(booking.endDate) < now)
          .map((booking: any) => ({
            id: booking.id,
            item: booking.product?.name || "Unknown Product",
            address: booking.address,
            status: "Completed", // Or determine dynamically if needed
            date: new Date(booking.endDate).toLocaleString("nl-NL"),
          }));

        setPastOrders(past);
      } catch (err) {
        console.error("Failed to load past bookings:", err);
      }
    };

    fetchPastOrders();
  }, []);

  return (
    <section>
      <h2 className="text-2xl font-bold mb-2">Recent Orders</h2>
      <div className="space-y-2">
        {pastOrders.length === 0 ? (
          <p className="text-gray-500">No past orders found.</p>
        ) : (
          pastOrders.map((order) => (
            <div
              key={order.id}
              className="bg-purple-50 border border-gray-300 p-4 rounded-md shadow-sm flex justify-between items-start"
            >
              <div>
                <p className="font-medium">Order #{order.id}</p>
                <p>
                  {order.item} towards {order.address}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{order.status}</p>
                <p className="text-sm text-gray-600">{order.date}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default UserRecentOrders;
