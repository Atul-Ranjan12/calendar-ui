import React, { useState } from "react";
import "./output.css";

interface SimpleRangePickerProps {
  validateDateFunction?: (date: Date) => boolean;
  validateRange?: (startDate: Date, endDate: Date) => boolean;
  rangeSelected: (startDate: Date, endDate: Date) => void;
  handleRangeInvalidError: (msg: string) => void;
  rangeInvalidErrorMessage: string;
  errorMessage: string;
  handleError: (msg: string) => void;
  darkMode?: boolean;
}

export const SimpleRangePicker = ({
  validateDateFunction,
  errorMessage,
  handleError,
  validateRange,
  rangeSelected,
  handleRangeInvalidError,
  rangeInvalidErrorMessage,
  darkMode = true,
}: SimpleRangePickerProps) => {
  const dateToday = new Date();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [rangeStart, setRangeStart] = useState<Date | null>(null);
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [selectedRange, setSelectedRange] = useState<string>("");

  function handleDateClick(day: Date) {
    if (!validateDateFunction || validateDateFunction(day)) {
      if (!rangeStart || (rangeStart && rangeEnd)) {
        setRangeStart(day);
        setRangeEnd(null);
        setSelectedRange("");
      } else {
        let start, end;
        if (day < rangeStart) {
          start = day;
          end = rangeStart;
        } else {
          start = rangeStart;
          end = day;
        }
        setRangeStart(start);
        setRangeEnd(end);
        setSelectedRange(`${formatDate(start)} to ${formatDate(end)}`);

        // Perform validation here
        if (!validateRange) {
          rangeSelected(start, end);
          return;
        }

        const isValidRange = validateRange(start, end);
        if (!isValidRange) {
          // Print error here
          handleRangeInvalidError(rangeInvalidErrorMessage);
        } else {
          rangeSelected(start, end);
        }
      }
    } else {
      handleError(errorMessage);
    }
  }

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const goToPrevMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const goToNextMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const isInRange = (day: Date) => {
    if (rangeStart && rangeEnd) {
      return day >= rangeStart && day <= rangeEnd;
    }
    if (rangeStart && hoverDate) {
      return (
        (day >= rangeStart && day <= hoverDate) ||
        (day <= rangeStart && day >= hoverDate)
      );
    }
    return false;
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
        currentDayDate.toDateString() === dateToday.toDateString();
      const isRangeStart =
        rangeStart &&
        currentDayDate.toDateString() === rangeStart.toDateString();
      const isRangeEnd =
        rangeEnd && currentDayDate.toDateString() === rangeEnd.toDateString();
      const isInCurrentRange = isInRange(currentDayDate);

      days.push(
        <div className="flex items-center justify-center w-full" key={day}>
          <div
            onClick={() => handleDateClick(currentDayDate)}
            onMouseEnter={() => setHoverDate(currentDayDate)}
            onMouseLeave={() => setHoverDate(null)}
            className={`
              flex items-center justify-center w-8 h-8 md:w-16 md:h-16
              font-poppins text-center text-sm md:text-base
              transition-all duration-200 ease-in-out
              hover:scale-105 cursor-pointer
              ${darkMode ? "text-white" : "text-black"}
              ${
                isRangeStart || isRangeEnd
                  ? darkMode
                    ? "bg-emerald-600"
                    : "bg-emerald-500"
                  : isInCurrentRange
                    ? darkMode
                      ? "bg-emerald-800"
                      : "bg-emerald-200"
                    : isCurrentDay
                      ? darkMode
                        ? "bg-gray-700"
                        : "bg-gray-200"
                      : ""
              }
              ${isInCurrentRange && !isRangeStart && !isRangeEnd ? "opacity-70" : ""}
            `}
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
            className={`w-4 h-4 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}
          ></div>
          <h6
            className={`text-xs font-light font-poppins ${darkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            Current date
          </h6>
        </div>
        <div className="flex flex-row space-x-2 items-center justify-center">
          <div
            className={`w-4 h-4 rounded-full ${darkMode ? "bg-emerald-600" : "bg-emerald-500"}`}
          ></div>
          <h6
            className={`text-xs font-light font-poppins ${darkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            Selected Range
          </h6>
        </div>
      </div>
      {selectedRange && (
        <div
          className={`mt-4 text-center font-poppins ${darkMode ? "text-white" : "text-black"}`}
        >
          Selected Range: {selectedRange}
        </div>
      )}
    </div>
  );
};
