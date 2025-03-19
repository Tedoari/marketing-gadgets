'use client';

import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { enGB } from 'date-fns/locale';

// Function to fetch booked dates from the server
const fetchBookedDates = async (productId: number): Promise<Date[]> => {
  const response = await fetch(`/api/booked_dates/${productId}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch booked dates');
  }

  const data = await response.json();
  if (!data || !Array.isArray(data)) {
    return []; // If no data or data is malformed, return an empty array
  }

  return data.map((dateStr: string) => new Date(dateStr)); // Convert strings to Date objects
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
  const [message, setMessage] = useState<string>(''); // To display success or error messages

  // Fetch booked dates when the component is mounted or productId changes
  useEffect(() => {
    fetchBookedDates(productId).then((booked) => {
      setBlockedDates(calculateBlockedDates(booked));
    }).catch((error) => {
      setMessage('Error fetching booked dates.');
      console.error(error);
    });
  }, [productId]);

  // Handle the reserve button click
  const handleReserve = async () => {
    if (!selectedDate) {
      setMessage('Please select a date to reserve.');
      return;
    }

    try {
      const response = await fetch(`/api/reserve/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedDate: selectedDate.toISOString() }), // Send the date as a string in ISO format
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Reservation successful!');
      } else {
        setMessage(data.message || 'Something went wrong.');
      }
    } catch (error) {
      setMessage('An error occurred while reserving the date.');
      console.error(error);
    }
  };

  const dayClassName = (date: Date) => {
    const isBlocked = blockedDates.some(
      (blockedDate) => blockedDate.toDateString() === date.toDateString()
    );
    return isBlocked ? 'text-gray-500' : ''; // Lighter text color for blocked dates
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
        inline // Always display the calendar
        dayClassName={dayClassName} // Apply custom styling to blocked dates
        locale={enGB} // Set the locale to English (GB) to start the week on Monday
      />
      {/* Message */}
      {message && <div className="mt-2 text-red-500">{message}</div>}
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
