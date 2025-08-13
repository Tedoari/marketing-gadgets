'use client';

import React, { useState, useEffect } from 'react';

interface Booking {
  id: number;
  startDate: string;
  endDate: string;
  product: { id: number; name: string };
}

// Moved outside the component so it's not a dependency
const colorPalette = [
  'bg-red-300',
  'bg-blue-300',
  'bg-green-300',
  'bg-yellow-300',
  'bg-purple-300',
  'bg-pink-300',
  'bg-orange-300',
];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [productColors, setProductColors] = useState<Record<number, string>>({});

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await fetch('/api/bookings');
        const data = await res.json();
        if (res.ok && data.bookings) {
          setBookings(data.bookings);

          const colorMap: Record<number, string> = {};
          data.bookings.forEach((b: Booking, index: number) => {
            if (!colorMap[b.product.id]) {
              colorMap[b.product.id] =
                colorPalette[index % colorPalette.length];
            }
          });
          setProductColors(colorMap);
        }
      } catch (error) {
        console.error('Failed to load bookings:', error);
      }
    }
    fetchBookings();
  }, []);

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const startDay = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();

    const calendarDays: (Date | null)[] = [
      ...Array.from({ length: startDay }, () => null),
      ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
    ];
    return calendarDays;
  };

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const calendarDays = generateCalendar();
  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  const bookedDates: Record<string, Booking[]> = {};
  bookings.forEach((b) => {
    const start = new Date(b.startDate);
    const end = new Date(b.endDate);
    for (
      const day = new Date(start);
      day <= end;
      day.setDate(day.getDate() + 1)
    ) {
      const key = formatDate(day);
      if (!bookedDates[key]) bookedDates[key] = [];
      bookedDates[key].push(b);
    }
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Month navigation */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
            )
          }
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          ←
        </button>
        <h2 className="text-xl font-semibold">
          {currentDate.toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          })}
        </h2>
        <button
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
            )
          }
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          →
        </button>
      </div>

      {/* Legend */}
      <div className="mb-4">
        <h3 className="font-medium mb-1">Legend:</h3>
        <div className="flex flex-wrap gap-3">
          {Object.entries(productColors).map(([productId, color]) => {
            const productName = bookings.find(
              (b) => b.product.id === Number(productId)
            )?.product.name;
            return (
              <div key={productId} className="flex items-center gap-1">
                <span className={`w-4 h-4 rounded ${color}`}></span>
                <span className="text-sm">{productName}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1 border border-gray-300">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="bg-gray-100 text-center font-medium py-2 border border-gray-200"
          >
            {day}
          </div>
        ))}

        {calendarDays.map((date, index) => {
          if (!date) {
            return <div key={index} className="h-24 border border-gray-200" />;
          }

          const dateKey = formatDate(date);
          const dayBookings = bookedDates[dateKey] || [];

          return (
            <div
              key={index}
              className="h-24 border border-gray-200 flex flex-col items-start p-1 bg-white hover:bg-blue-50 transition-colors duration-200"
            >
              <span className="text-sm font-semibold">{date.getDate()}</span>
              <div className="flex gap-1 flex-wrap mt-1">
                {dayBookings.map((b, idx) => (
                  <span
                    key={idx}
                    title={b.product.name}
                    className={`w-3 h-3 rounded-full ${productColors[b.product.id]}`}
                  ></span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
