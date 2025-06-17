'use client';

import React, { useState } from 'react';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const goToPreviousMonth = () => {
    const prevMonth = new Date(currentDate);
    prevMonth.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(prevMonth);
  };

  const goToNextMonth = () => {
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(nextMonth);
  };

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const startDay = firstDayOfMonth.getDay(); // Sunday = 0
    const daysInMonth = lastDayOfMonth.getDate();

    const calendarDays = [];

    // Fill in days before the first day of the month
    for (let i = 0; i < startDay; i++) {
      calendarDays.push(null);
    }

    // Fill in actual days
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(new Date(year, month, day));
    }

    return calendarDays;
  };

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const calendarDays = generateCalendar();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={goToPreviousMonth}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          ←
        </button>
        <h2 className="text-xl font-semibold">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <button
          onClick={goToNextMonth}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 border border-gray-300">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="bg-gray-100 text-center font-medium py-2 border-b border-r last:border-r-0"
          >
            {day}
          </div>
        ))}

        {calendarDays.map((date, index) => (
          <div
            key={index}
            className={`h-24 border border-gray-200 flex items-start justify-start p-1 bg-white hover:bg-blue-100 transition-colors duration-200`}
          >
            {date ? <span className="text-sm font-semibold">{date.getDate()}</span> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
