"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { enGB } from "date-fns/locale";

const fetchBookedDates = async (
  productId: number
): Promise<{ startDate: string; endDate: string }[]> => {
  const res = await fetch(`/api/booked_dates/${productId}`);
  if (!res.ok) throw new Error("Failed to fetch booked dates");
  return res.json();
};

const calculateBlockedDates = (
  bookings: { startDate: string; endDate: string }[]
): Date[] => {
  const blocked = new Set<number>();

  bookings.forEach(({ startDate, endDate }) => {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    for (
      let time = start - 7 * 86400000;
      time <= end + 14 * 86400000;
      time += 86400000
    ) {
      blocked.add(time);
    }
  });

  return Array.from(blocked).map((t) => new Date(t));
};

export default function ProductDateRangePicker({
  productId,
}: {
  productId: number;
}) {
  const router = useRouter();
  const [range, setRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = range;
  const [blockedDates, setBlockedDates] = useState<Date[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchBookedDates(productId)
      .then((bookings) => setBlockedDates(calculateBlockedDates(bookings)))
      .catch(() => setMessage("Failed to load blocked dates"));
  }, [productId]);

  const isRangeBlocked = (start: Date | null, end: Date | null) => {
    if (!start || !end) return false;
    return blockedDates.some(
      (blockedDate) => blockedDate >= start && blockedDate <= end
    );
  };

  const filterBlockedDates = (date: Date) => {
    return !blockedDates.some(
      (blockedDate) => blockedDate.toDateString() === date.toDateString()
    );
  };

  const handleChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;

    if (start && end && isRangeBlocked(start, end)) {
      setMessage(
        "Selected date range overlaps blocked dates. Please choose another range."
      );
      setRange([start, null]);
      return;
    }

    setMessage("");
    setRange(dates);
  };

  const handleReserve = () => {
    if (!startDate || !endDate) return;
    const query = new URLSearchParams({
      start: startDate.toISOString(),
      end: endDate.toISOString(),
      productId: productId.toString(),
    });
    router.push(`/confirmation?${query.toString()}`);
  };

  return (
    <div className="flex flex-col items-center">
      <label className="font-semibold mb-2">Select a Date Range</label>
      <DatePicker
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={handleChange}
        filterDate={filterBlockedDates}
        dateFormat="dd/MM/yyyy"
        className="border px-4 py-2 rounded-lg"
        inline
        locale={enGB}
        minDate={new Date()}
      />
      {message && (
        <div className="mt-2 text-red-600 font-semibold">{message}</div>
      )}
      <button
        className="w-[320px] bg-black text-white py-2 mt-4 rounded-lg disabled:opacity-50"
        disabled={!startDate || !endDate || message !== ""}
        onClick={handleReserve}
      >
        Reserve
      </button>
    </div>
  );
}
