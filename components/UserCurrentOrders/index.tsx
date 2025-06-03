"use client";

import React, { useEffect, useState } from "react";

type Order = {
  id: number;
  item: string;
  address: string;
  status: string;
  date: string;
};

const UserCurrentOrders = () => {
  const [upcomingOrders, setUpcomingOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/bookings");
        const json = await res.json();

        if (!res.ok) throw new Error(json.message || "Failed to fetch");

        const bookings = json.bookings || [];
        const now = new Date();

        const upcoming = bookings
          .filter((booking: any) => new Date(booking.endDate) >= now)
          .map((booking: any) => ({
            id: booking.id,
            item: booking.product?.name || "Unknown Product",
            address: booking.address,
            status: "Upcoming", // Change if you use real status
            date: new Date(booking.startDate).toLocaleString("nl-NL"),
          }));

        setUpcomingOrders(upcoming);
      } catch (err) {
        console.error("Failed to load bookings:", err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-2">Current Orders</h2>

      {upcomingOrders.length === 0 ? (
        <p className="text-gray-500">No upcoming orders found.</p>
      ) : (
        upcomingOrders.map((order) => (
          <div
            key={order.id}
            className="bg-purple-50 border border-gray-300 p-4 rounded-md shadow-sm flex justify-between items-start mb-2"
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
    </section>
  );
};

export default UserCurrentOrders;
