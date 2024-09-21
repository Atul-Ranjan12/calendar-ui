import React, { useState, useRef, useEffect } from "react";
import "./output.css";

interface DatePickerProps {
  validateDateFunction?: (date: Date) => boolean;
  errorMessage?: string;
  handleError?: (msg: string) => void;
  customDateFormatter?: (date: Date) => string;
  darkMode?: boolean;
  onDateSelect: (date: Date) => void;
  placeholder?: string;
  inputStyles?: React.CSSProperties;
}

export const DatePicker = ({
  validateDateFunction,
  onDateSelect,
  errorMessage,
  handleError,
  placeholder,
  darkMode,
  customDateFormatter,
  inputStyles,
}: DatePickerProps) => {
  const dateToday = new Date();

  // See if calendar is open
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const datePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleCalendar = () => setIsOpen(!isOpen);

  // Function to call when the user has picked a date
  const handleDateSelect = (date: Date) => {
    if (validateDateFunction && !validateDateFunction(date)) {
      if (handleError) handleError(errorMessage ? errorMessage : "");
      return;
    }
    setSelectedDate(date);
    onDateSelect(date);
    setIsOpen(false);
  };

  // Function to format the date to a string to display in input
  const formatDate = (date: Date) => {
    if (customDateFormatter) return customDateFormatter(date);

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Reuse the calendar logic from SimpleCalendar
  const goToPrevMonth = () => {
    setCurrentDate((prevDate) => {
      const prevMonthDate = new Date(prevDate);
      prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);
      return prevMonthDate;
    });
  };

  // Go to the next month
  const goToNextMonth = () => {
    setCurrentDate((prevDate) => {
      const nextMonthDate = new Date(prevDate);
      nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
      return nextMonthDate;
    });
  };

  // Function to print the days of the month
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
      days.push(<span key={`empty-${i}`} className="p-0"></span>);
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
            onClick={() => handleDateSelect(currentDayDate)}
            className={`flex items-center justify-center w-8 h-8 text-xs md:w-10 md:h-10 font-poppins text-center hover:scale-105 duration-200 hover:cursor-pointer
              ${darkMode ? "text-white hover:bg-gray-700" : "text-gray-600 hover:bg-gray-200"}
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
      days.push(<span key={`empty-end-${i}`} className="p-0"></span>);
    }
    return days;
  };

  return (
    <div className="w-full h-screen">
      <div
        ref={datePickerRef}
        className={`relative ${darkMode ? "text-white" : "text-black"} w-[300px] z-50`}
      >
        <input
          type="text"
          readOnly
          value={selectedDate ? formatDate(selectedDate) : ""}
          placeholder={placeholder}
          onClick={toggleCalendar}
          className={`w-full p-2 border rounded ${
            darkMode
              ? "bg-gray-700 border-gray-600"
              : "bg-white border-gray-300"
          }`}
          style={inputStyles}
        />
        {isOpen && (
          <div
            className={`absolute z-10 mt-1 w-64 ${darkMode ? "bg-gray-800" : "bg-white"} w-full border rounded shadow-lg`}
          >
            <div className="flex justify-between items-center p-2">
              <button onClick={goToPrevMonth}>&lt;</button>
              <span
                className={`text-xs font-poppins uppercase ${darkMode ? "text-white" : "text-gray-700"}`}
              >
                {currentDate.toLocaleDateString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <button onClick={goToNextMonth}>&gt;</button>
            </div>
            <div className="grid grid-cols-7 gap-1 p-2">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div key={day} className="text-center text-xs">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 p-2">{daysInMonth()}</div>
          </div>
        )}
      </div>
    </div>
  );
};
