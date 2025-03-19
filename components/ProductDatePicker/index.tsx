'use client';

import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Simulated function to fetch booked dates from a database
const fetchBookedDates = async (productId: number): Promise<Date[]> => {
  // Replace with real API call
  return [new Date(2025, 7, 8), new Date(2025, 7, 9)]; // Example: 8th-9th August
};

const calculateBlockedDates = (bookedDates: Date[]): Date[] => {
  const blocked = new Set<number>();

  bookedDates.forEach((date) => {
    const time = date.getTime();
    for (let i = -7; i <= 14; i++) {
      blocked.add(new Date(time + i * 86400000).getTime());
    }
  });

  return Array.from(blocked).map((t) => new Date(t));
};

export default function ProductDatePicker({ productId }: { productId: number }) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [blockedDates, setBlockedDates] = useState<Date[]>([]);

  useEffect(() => {
    fetchBookedDates(productId).then((booked) => {
      setBlockedDates(calculateBlockedDates(booked));
    });
  }, [productId]);

  const handleReserve = () => {
    // Handle the reservation logic here
    if (selectedDate) {
      alert(`You have selected: ${selectedDate.toLocaleDateString()}`);
    } else {
      alert('Please select a date to reserve.');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <label className="font-semibold mb-2">Select a Date</label>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        excludeDates={blockedDates}
        dateFormat="dd/MM/yyyy"
        className="border px-4 py-2 rounded-lg"
        inline // This prop makes the calendar always visible
      />
      {/* Reserve Button */}
      <button
        className="w-[320px] bg-black text-white py-2 mt-4 rounded-lg text-center"
        onClick={handleReserve}
      >
        Reserve
      </button>
    </div>
  );
}
