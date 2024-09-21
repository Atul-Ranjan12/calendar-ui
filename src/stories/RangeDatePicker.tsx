import React, { useState, useRef, useEffect } from "react";
import "./output.css";

interface RangeDatePickerProps {
  validateDateFunction?: (date: Date) => boolean;
  validateRange?: (startDate: Date, endDate: Date) => boolean;
  onRangeSelect: (startDate: Date, endDate: Date) => void;
  handleError?: (msg: string) => void;
  errorMessage?: string;
  rangeInvalidErrorMessage?: string;
  customDateFormatter?: (date: Date) => string;
  darkMode?: boolean;
  placeholderStart?: string;
  placeholderEnd?: string;
  inputStyles?: React.CSSProperties;
}

export const RangeDatePicker = ({
  validateDateFunction,
  validateRange,
  onRangeSelect,
  handleError,
  errorMessage = "Invalid date",
  rangeInvalidErrorMessage = "Invalid date range",
  customDateFormatter,
  darkMode = false,
  placeholderStart = "Start Date",
  placeholderEnd = "End Date",
  inputStyles,
}: RangeDatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [rangeStart, setRangeStart] = useState<Date | null>(null);
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);

  const inputContainerRef = useRef<HTMLDivElement>(null);

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

  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputContainerRef.current && calendarRef.current) {
      const inputWidth = inputContainerRef.current.offsetWidth;
      calendarRef.current.style.width = `${inputWidth}px`;

      // Set a CSS custom property for the width
      calendarRef.current.style.setProperty(
        "--calendar-width",
        `${inputWidth}px`,
      );

      // Force a reflow to ensure the CSS update is applied
      void calendarRef.current.offsetHeight;
    }
  }, [isOpen]);

  const toggleCalendar = () => setIsOpen(!isOpen);

  const formatDate = (date: Date): string => {
    if (customDateFormatter) return customDateFormatter(date);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDateClick = (day: Date) => {
    if (!validateDateFunction || validateDateFunction(day)) {
      if (!rangeStart || (rangeStart && rangeEnd)) {
        setRangeStart(day);
        setRangeEnd(null);
      } else {
        let start = rangeStart;
        let end = day;
        if (day < rangeStart) {
          start = day;
          end = rangeStart;
        }
        setRangeStart(start);
        setRangeEnd(end);

        if (!validateRange || validateRange(start, end)) {
          onRangeSelect(start, end);
          setIsOpen(false);
        } else if (handleError) {
          handleError(rangeInvalidErrorMessage);
        }
      }
    } else if (handleError) {
      handleError(errorMessage);
    }
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
      days.push(<span key={`empty-${i}`} className="p-0"></span>);
    }

    for (let day = 1; day <= numDaysInMonth; day++) {
      const currentDayDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day,
      );
      const isCurrentDay =
        currentDayDate.toDateString() === new Date().toDateString();
      const isRangeStart =
        rangeStart &&
        currentDayDate.toDateString() === rangeStart.toDateString();
      const isRangeEnd =
        rangeEnd && currentDayDate.toDateString() === rangeEnd.toDateString();
      const isInCurrentRange = isInRange(currentDayDate);

      days.push(
        <div
          className="aspect-square flex items-center justify-center w-full"
          key={day}
        >
          <div
            onClick={() => handleDateClick(currentDayDate)}
            onMouseEnter={() => setHoverDate(currentDayDate)}
            onMouseLeave={() => setHoverDate(null)}
            className={`
              flex items-center justify-center w-full h-full text-xs
              font-poppins text-center hover:scale-105 duration-200 hover:cursor-pointer
              ${darkMode ? "text-white hover:bg-gray-700" : "text-gray-600 hover:bg-gray-200"}
              ${
                isRangeStart || isRangeEnd
                  ? darkMode
                    ? "bg-emerald-700"
                    : "bg-emerald-500"
                  : isInCurrentRange
                    ? darkMode
                      ? "bg-emerald-900"
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

    return days;
  };

  return (
    <div className="h-screen w-full max-w-[600px]">
      <div
        ref={datePickerRef}
        className={`relative ${darkMode ? "text-white" : "text-black"} w-full z-50`}
      >
        <div ref={inputContainerRef} className="flex space-x-2 mb-2 w-full">
          <input
            type="text"
            readOnly
            value={rangeStart ? formatDate(rangeStart) : ""}
            placeholder={placeholderStart}
            onClick={toggleCalendar}
            className={`w-1/2 p-2 border rounded ${
              darkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-white border-gray-300"
            }`}
            style={inputStyles}
          />
          <input
            type="text"
            readOnly
            value={rangeEnd ? formatDate(rangeEnd) : ""}
            placeholder={placeholderEnd}
            onClick={toggleCalendar}
            className={`w-1/2 p-2 border rounded ${
              darkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-white border-gray-300"
            }`}
            style={inputStyles}
          />
        </div>
        {isOpen && (
          <div
            ref={calendarRef}
            className={`absolute w-full z-10 mt-1 ${
              darkMode ? "bg-gray-800" : "bg-white"
            } border rounded shadow-lg aspect-[8/7]`}
            style={{
              width: "var(--calendar-width, 100%)",
            }}
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
            <div className="flex-grow grid grid-cols-7 gap-1 p-2">
              {daysInMonth()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
