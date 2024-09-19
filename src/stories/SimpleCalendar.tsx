import React, { useState } from "react";
import "./output.css";

interface SimpleCalendarProps {
  validateDateFunction: (date: Date) => boolean;
  errorMessage: string;
  handleError: (msg: string) => void;
  darkMode?: boolean;
  handleDateSelect: (date: Date) => void;
}

export const SimpleCalendar = ({
  validateDateFunction,
  errorMessage,
  handleError,
  handleDateSelect,
  darkMode = false,
}: SimpleCalendarProps) => {
  const dateToday = new Date();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  function dateClicked(day: Date) {
    if (!validateDateFunction) {
      setSelectedDate(day);
      handleDateSelect(day);
      return;
    }

    const isValid = validateDateFunction(day);
    if (!isValid) {
      handleError(errorMessage);
      return;
    }
    setSelectedDate(day);
    handleDateSelect(day);
  }

  const goToPrevMonth = () => {
    setCurrentDate((prevDate) => {
      const prevMonthDate = new Date(prevDate);
      prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);
      prevMonthDate.setDate(new Date().getDate());
      return prevMonthDate;
    });
  };

  const goToNextMonth = () => {
    setCurrentDate((prevDate) => {
      const nextMonthDate = new Date(prevDate);
      nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
      nextMonthDate.setDate(new Date().getDate());
      return nextMonthDate;
    });
  };

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
      days.push(<span key={`empty-${i}`} className="p-6"></span>);
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

      days.push(
        <div className="flex items-center justify-center w-full" key={day}>
          <div
            onClick={() => dateClicked(currentDayDate)}
            className={`flex items-center justify-center w-8 h-8 md:w-16 md:h-16 font-poppins text-center hover:scale-105 duration-200 hover:cursor-pointer
              ${darkMode ? "text-white" : "text-black"}
              ${
                isSelectedDay
                  ? darkMode
                    ? "bg-emerald-700"
                    : "bg-emerald-500"
                  : isCurrentDay
                    ? darkMode
                      ? "bg-emerald-900"
                      : "bg-emerald-200"
                    : isSaturday || isSunday
                      ? darkMode
                        ? "text-gray-400"
                        : "text-gray-600"
                      : ""
              }`}
          >
            {day}
          </div>
        </div>,
      );
    }

    const totalDays = startingDay + numDaysInMonth;
    const remainingDays = 42 - totalDays;
    for (let i = 0; i < remainingDays; i++) {
      days.push(<span key={`empty-end-${i}`} className="p-6"></span>);
    }
    return days;
  };

  return (
    <div
      className={`relative w-full h-full flex flex-col p-2 md:p-4 border shadow-md ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-black"}`}
    >
      <div className="flex flex-row justify-between items-center md:p-2 rounded max-w-full">
        <button
          className={`p-2 px-6 uppercase font-poppins font-light text-lg hover:scale-110 ${darkMode ? "text-white" : "text-black"}`}
          onClick={goToPrevMonth}
        >
          Prev
        </button>
        <span
          className={`font-poppins text-md ${darkMode ? "text-gray-300" : "text-gray-600"}`}
        >
          {currentDate.toLocaleDateString("default", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <button
          className={`p-2 px-6 uppercase font-poppins font-light text-lg hover:scale-110 ${darkMode ? "text-white" : "text-black"}`}
          onClick={goToNextMonth}
        >
          Next
        </button>
      </div>
      <div className="grid grid-cols-7 w-full gap-0">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className={`flex items-center justify-center p-2 md:p-2 text-xs font-poppins uppercase rounded-full ${darkMode ? "text-gray-400" : "text-slate-600"}`}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="mt-12 grid grid-cols-7 w-full">{daysInMonth()}</div>
      <div className="flex flex-row space-x-5 mt-12">
        <div className="flex flex-row space-x-2 items-center justify-center">
          <div
            className={`w-4 h-4 rounded-full ${darkMode ? "bg-emerald-900" : "bg-emerald-100"}`}
          ></div>
          <h6
            className={`text-xs font-light font-poppins ${darkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            Current date
          </h6>
        </div>
        <div className="flex flex-row space-x-2 items-center justify-center">
          <div
            className={`w-4 h-4 rounded-full ${darkMode ? "bg-emerald-700" : "bg-emerald-500"}`}
          ></div>
          <h6
            className={`text-xs font-light font-poppins ${darkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            Selected Date
          </h6>
        </div>
      </div>
    </div>
  );
};
