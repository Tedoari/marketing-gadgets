"use client";

import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

type Order = {
  id: number;
  item: string;
  eventName?: string | null;
  address: string;
  companyName: string;
  userName: string;
  status: string;
  startDate: string;
  endDate: string;
};

const AdminOrders = () => {
  const [upcoming, setUpcoming] = useState<Order[]>([]);
  const [completed, setCompleted] = useState<Order[]>([]);
  const [active, setActive] = useState<Order[]>([]);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const res = await fetch(`/api/bookings`);
        const json = await res.json();

        if (!res.ok) throw new Error(json.message || "Failed to fetch");

        const now = new Date();

        const bookingsWithStatus: Order[] = (json.bookings || []).map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (booking: any) => {
            const start = new Date(booking.startDate);
            const end = new Date(booking.endDate);

            const daysBefore = new Date(start);
            daysBefore.setDate(start.getDate() - 7);

            const daysAfter = new Date(end);
            daysAfter.setDate(end.getDate() + 7);

            let status = "";
            if (now >= daysBefore && now <= daysAfter) {
              status = "Active";
            } else if (now < start) {
              status = "Upcoming";
            } else if (now > end) {
              status = "Completed";
            }

            return {
              id: booking.id,
              item: booking.product?.name || "Unknown Product",
              eventName: booking.eventName || null,
              address: booking.address,
              companyName: booking.user?.companyName || "Unknown Company",
              userName: booking.user?.name || "Unknown User",
              status,
              startDate: start.toLocaleDateString("nl-NL"),
              endDate: end.toLocaleDateString("nl-NL"),
            };
          }
        );

        setActive(bookingsWithStatus.filter((o) => o.status === "Active"));
        setUpcoming(bookingsWithStatus.filter((o) => o.status === "Upcoming"));
        setCompleted(
          bookingsWithStatus.filter((o) => o.status === "Completed")
        );
      } catch (err) {
        console.error("Failed to load bookings:", err);
      }
    };

    fetchAllOrders();
  }, []);

  const handleDelete = async (orderId: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/bookings?id=${orderId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      setActive((prev) => prev.filter((o) => o.id !== orderId));
      setUpcoming((prev) => prev.filter((o) => o.id !== orderId));
      setCompleted((prev) => prev.filter((o) => o.id !== orderId));
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Something went wrong while deleting.");
    }
  };

  const renderOrders = (orders: Order[], title: string) => (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      {orders.length === 0 ? (
        <p className="text-gray-500">No {title.toLowerCase()} found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="bg-purple-50 border border-gray-300 p-4 rounded-md shadow-sm flex justify-between items-start mb-2"
          >
            <div>
              <p className="font-medium">Order #{order.id}</p>
              <p>
                {order.item}
                {order.eventName ? ` — ${order.eventName}` : ""} towards{" "}
                {order.address}
              </p>
              <p className="text-sm text-gray-600">
                {order.companyName} — {order.userName}
              </p>
            </div>
            <div className="text-right flex flex-col items-end gap-1">
              <p className="font-semibold">{order.status}</p>
              <p className="text-sm text-gray-600">
                {order.startDate} — {order.endDate}
              </p>
              <button
                onClick={() => handleDelete(order.id)}
                className="text-red-600 hover:text-red-800"
                title="Cancel order"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">All Orders</h2>
      {renderOrders(active, "Active Orders")}
      {renderOrders(upcoming, "Upcoming Orders")}
      {renderOrders(completed, "Completed Orders")}
    </section>
  );
};

export default AdminOrders;
