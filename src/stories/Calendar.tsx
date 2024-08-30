import React, { useState, useContext, useEffect } from "react";
import "./BookingCalendar.css";

/**
 * Primary UI component for user interaction
 */
interface CalendarProps {
  validateDateFunction: (date: Date) => boolean;
  errorMessage: string;
  handleError: (msg: string) => void;
}

// Booking Calendar itself
export const Calendar = ({
  validateDateFunction,
  errorMessage,
  handleError,
}: CalendarProps) => {
  const dateToday = new Date();
  // State to store the current date
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  // States for the selected date
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Handle when a date has been clicked
  function dateClicked(day: Date) {
    if (!validateDateFunction) {
      setSelectedDate(day);
      return;
    }

    const isValid = validateDateFunction(day);
    if (!isValid) {
      handleError(errorMessage);
      return;
    }
    setSelectedDate(day);
  }

  // This function handles going to the previous month
  const goToPrevMonth = () => {
    setCurrentDate((prevDate) => {
      const prevMonthDate = new Date(prevDate);
      prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);

      prevMonthDate.setDate(new Date().getDate());

      return prevMonthDate;
    });
  };

  // This function handles going to the next month
  const goToNextMonth = () => {
    setCurrentDate((prevDate) => {
      const nextMonthDate = new Date(prevDate);
      nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);

      nextMonthDate.setDate(new Date().getDate());

      return nextMonthDate;
    });
  };

  // Function to fetch and calculate days in month and fill in the UI as necessary
  const daysInMonth = () => {
    const days: JSX.Element[] = [];

    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    );
    const startingDay = firstDayOfMonth.getDay();

    const numDaysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    ).getDate();

    for (let i = 0; i < startingDay; i++) {
      days.push(<span key={`empty-${i}`} className="p-10"></span>);
    }

    for (let day = 1; day <= numDaysInMonth; day++) {
      const currentDayDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day,
      );

      const isCurrentDay =
        day === dateToday.getDate() &&
        currentDate.getMonth() === dateToday.getMonth() &&
        currentDate.getFullYear() === dateToday.getFullYear();

      const isSelectedDay =
        selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === currentDate.getMonth() &&
        selectedDate.getFullYear() === currentDate.getFullYear();

      const isSaturday = (startingDay + day - 1) % 7 === 6;
      const isSunday = (startingDay + day - 1) % 7 === 0;

      const formattedDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day + 1,
      )
        .toISOString()
        .split("T")[0];

      days.push(
        <div className="flex items-center justify-center w-full" key={day}>
          <div
            onClick={() => dateClicked(currentDayDate)}
            className={`flex items-center justify-center w-10 h-10 md:w-16 md:h-16 text-sm font-poppins text-center rounded-full hover:scale-105 duration-200 hover:cursor-pointer ${
              isSelectedDay
                ? "bg-emerald-500"
                : isCurrentDay
                  ? "bg-emerald-200"
                  : isSaturday || isSunday
                    ? "bg-red-100"
                    : "bg-slate-100"
            }`}
          >
            {day}
          </div>
        </div>,
      );
    }

    return days;
  };

  return (
    <div className="relative w-full h-full flex flex-col p-2 md:p-4 border border-black shadow-md bg-white">
      <div className="flex flex-row justify-between items-center md:p-2 rounded">
        <button
          className="p-2 px-6 text-black uppercase font-poppins font-light text-lg hover:scale-110"
          onClick={goToPrevMonth}
        >
          Prev
        </button>
        <span className="text-gray-600 font-poppins text-md">
          {currentDate.toLocaleDateString("default", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <button
          className="p-2 px-6  text-black uppercase font-poppins font-light text-lg hover:scale-110"
          onClick={goToNextMonth}
        >
          Next
        </button>
      </div>
      <div className="grid grid-cols-7 w-full gap-4">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="flex items-center justify-center p-2 md:p-8 text-xs font-poppins uppercase text-slate-600 rounded-full"
          >
            {day}
          </div>
        ))}
        {daysInMonth()}
      </div>
      <div className="flex flex-row space-x-5 mt-12">
        <div className="flex flex-row space-x-2 items-center justify-center">
          <div className="w-4 h-4 bg-emerald-100 rounded-full"></div>
          <h6 className="text-xs font-light font-poppins">Current date</h6>
        </div>
        <div className="flex flex-row space-x-2 items-center justify-center">
          <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
          <h6 className="text-xs font-light font-poppins">Selected Date</h6>
        </div>

        <div className="flex flex-row space-x-2 items-center justify-center">
          <div className="w-4 h-4 bg-slate-200 rounded-full"></div>
          <h6 className="text-xs font-light font-poppins">Date Unavailable</h6>
        </div>
        <div className="flex flex-row space-x-2 items-center justify-center">
          <div className="w-4 h-4 bg-red-200 rounded-full"></div>
          <h6 className="text-xs font-light font-poppins">Weekend</h6>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
