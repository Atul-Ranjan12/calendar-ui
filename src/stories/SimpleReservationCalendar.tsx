import React, { useState, useEffect } from "react";
import "./output.css";

export interface ReservationDate {
  date: Date;
  numSlots: number;
  timings?: string[];
}

export interface FormData {
  name: string;
  labelName: string;
  placeholder: string;
}

interface SimpleReservationCalendarProps {
  validateDateFunction: (date: Date) => boolean;
  errorMessage: string;
  handleError: (msg: string) => void;
  darkMode?: boolean;
  onDateSelect: (date: Date, timing?: string) => void;
  reservationDates?: ReservationDate[];

  // Function to execute when user has decided to
  // make their custom function to proceed
  customProceedFunction?: () => void;
  // If no custom function is to be called, take in the
  // form data from the user to display the form
  formFillData?: FormData[];
  // Function after the form is filled and needs to be executes
  // The object should be of the format { formName: value }
  onFormFillAction?: (formData: { [key: string]: string }) => {};
}

export const SimpleReservationCalendar = ({
  validateDateFunction,
  errorMessage,
  handleError,
  onDateSelect,
  reservationDates,
  customProceedFunction,
  onFormFillAction,
  formFillData,
  darkMode = false,
}: SimpleReservationCalendarProps) => {
  const dateToday = new Date();

  // Handles date changes
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  // Handles timings
  const [selectedTiming, setSelectedTiming] = useState<string | null>(null);
  // Handles available dates
  const [availableDates, setAvailableDates] = useState<ReservationDate[]>([]);
  // Stores the state if the reservation has timings at all
  const [hasTimings, setHasTimings] = useState<boolean>(false);

  // States for the form fill section
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (reservationDates && reservationDates.length > 0) {
      const currentMonthDates = reservationDates.filter(
        (date) =>
          date.date.getMonth() === currentDate.getMonth() &&
          date.date.getFullYear() === currentDate.getFullYear(),
      );
      setAvailableDates(currentMonthDates);
    } else {
      setAvailableDates([]);
    }

    // Check if any date has timings
    checkForTimings(reservationDates);
  }, [currentDate, reservationDates]);

  const checkForTimings = (reservationDates?: ReservationDate[]) => {
    if (reservationDates) {
      const hasTimings = reservationDates.some(
        (date) => date.timings && date.timings.length > 0,
      );
      setHasTimings(hasTimings);
    } else {
      setHasTimings(false);
    }
  };

  function dateClicked(day: Date) {
    const isAvailable = availableDates.some(
      (d) => d.date.toDateString() === day.toDateString(),
    );

    if (!isAvailable) {
      handleError("This date is not available for reservation.");
      return;
    }

    if (!validateDateFunction(day)) {
      handleError(errorMessage);
      return;
    }

    setSelectedDate(day);
    setSelectedTiming(null);
    onDateSelect(day);
  }

  function timingClicked(timing: string) {
    setSelectedTiming(timing);
    if (selectedDate) {
      onDateSelect(selectedDate, timing);
    }
  }

  const goToPrevMonth = () => {
    setCurrentDate((prevDate) => {
      const prevMonthDate = new Date(prevDate);
      prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);
      return prevMonthDate;
    });
  };

  const goToNextMonth = () => {
    setCurrentDate((prevDate) => {
      const nextMonthDate = new Date(prevDate);
      nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
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
      const isAvailable = availableDates.some(
        (d) => d.date.toDateString() === currentDayDate.toDateString(),
      );

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
                    : isAvailable
                      ? darkMode
                        ? "bg-blue-700"
                        : "bg-blue-200"
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

  const onProceedButtonClicked = () => {
    if (customProceedFunction) {
      customProceedFunction();
      return;
    }

    setShowForm(true);
  };

  const handleFormChange = (name: string, value: string) => {
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleFormSubmit = () => {
    if (onFormFillAction) {
      onFormFillAction(formValues);
    }
  };

  const renderTimings = () => {
    let selectedReservation: ReservationDate | undefined;

    if (selectedDate) {
      selectedReservation = availableDates.find(
        (d) => d.date.toDateString() === selectedDate.toDateString(),
      );
    }

    return (
      <div
        className={`pt-8 w-full h-full pr-12 flex flex-col relative ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-black"
        }`}
      >
        <h3
          className={`font-poppins mb-2 ml-4 text-2xl font- ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          Available Timings
        </h3>

        <div
          className={`mt-4 ml-4 font-poppins text-md  ${darkMode ? "text-white" : "text-gray-600"}`}
        >
          Select one out of the available timings
        </div>

        <div className="flex flex-col ml-4 w-full space-y-2 mt-4">
          {selectedReservation &&
            selectedReservation.timings &&
            selectedReservation.timings.map((timing) => (
              <button
                key={timing}
                onClick={() => timingClicked(timing)}
                className={`py-2 rounded font-poppins text-md ${
                  selectedTiming === timing
                    ? darkMode
                      ? "bg-emerald-700 text-white"
                      : "bg-emerald-500 text-white"
                    : darkMode
                      ? "bg-gray-700 text-gray-200 text-sm"
                      : "bg-white text-black border border-gray-400"
                } hover:opacity-80 w-full`}
              >
                {timing}
              </button>
            ))}
          <div className="md:hidden block w-full pb-10">
            <button
              className={`px-8 py-2 rounded font-poppins w-full text-md hover:scale-105 duration-200 ${!darkMode ? "bg-black text-white" : "bg-emerald-700 text-white"}`}
            >
              Proceed
            </button>
          </div>
        </div>

        <div className="md:block hidden">
          <div className="absolute bottom-4 right-4">
            <button
              onClick={() => {
                onProceedButtonClicked();
              }}
              className={`px-8 py-2 rounded font-poppins text-md hover:scale-105 duration-200 ${!darkMode ? "bg-black text-white" : "bg-emerald-700 text-white"}`}
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render the form
  const renderForm = () => {
    return (
      <div
        className={`pt-8 w-full h-full pr-12 flex flex-col relative ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-black"
        }`}
      >
        <h3
          className={`font-poppins mb-2 ml-4 text-2xl ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          Fill in the details
        </h3>

        <div
          className={`mt-4 ml-4 font-poppins text-md ${
            darkMode ? "text-white" : "text-gray-600"
          }`}
        >
          Please provide the following information
        </div>

        <div className="flex flex-col ml-4 w-full space-y-4 mt-4">
          {formFillData &&
            formFillData.map((field, index) => (
              <div key={index} className="">
                <label
                  className={`block font-poppins font-light text-xs mb-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  {field.labelName}
                </label>
                <input
                  type="text"
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formValues[field.name] || ""}
                  onChange={(e) => handleFormChange(field.name, e.target.value)}
                  className={`w-full p-2 border rounded ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-black"
                  }`}
                />
              </div>
            ))}
          <div className="md:hidden block w-full pb-10 space-y-2">
            <button
              onClick={handleFormSubmit}
              className={`px-8 py-2 rounded font-poppins w-full text-md hover:scale-105 duration-200 ${
                !darkMode ? "bg-black text-white" : "bg-emerald-700 text-white"
              }`}
            >
              Continue
            </button>
            <button
              onClick={() => setShowForm(false)}
              className={`px-8 py-2 rounded font-poppins w-full text-md hover:scale-105 duration-200 ${
                darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black"
              }`}
            >
              Cancel
            </button>
          </div>
        </div>

        <div className="md:block hidden">
          <div className="absolute bottom-4 right-4 space-x-2">
            <button
              onClick={handleFormSubmit}
              className={`px-8 py-2 rounded font-poppins text-md hover:scale-105 duration-200 ${
                !darkMode ? "bg-black text-white" : "bg-emerald-700 text-white"
              }`}
            >
              Continue
            </button>
            <button
              onClick={() => setShowForm(false)}
              className={`px-8 py-2 rounded font-poppins text-md hover:scale-105 duration-200 ${
                darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black"
              }`}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row w-full">
      <div className={`flex flex-col md:flex-row`}>
        <div
          className={`relative h-full flex flex-col p-2 md:p-4 border shadow-md ${
            darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-black"
          }`}
        >
          <div className="flex flex-row justify-between items-center md:p-2 rounded max-w-full">
            <button
              className={`p-2 px-6 uppercase font-poppins font-light text-lg hover:scale-110 ${
                darkMode ? "text-white" : "text-black"
              }`}
              onClick={goToPrevMonth}
            >
              Prev
            </button>
            <span
              className={`font-poppins text-md ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {currentDate.toLocaleDateString("default", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <button
              className={`p-2 px-6 uppercase font-poppins font-light text-lg hover:scale-110 ${
                darkMode ? "text-white" : "text-black"
              }`}
              onClick={goToNextMonth}
            >
              Next
            </button>
          </div>
          <div className="grid grid-cols-7 w-full gap-0">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
              (day, idx) => (
                <span
                  key={idx}
                  className={`text-center font-poppins md:text-md p-2 font-light uppercase ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {day}
                </span>
              ),
            )}
          </div>
          <div className="grid grid-cols-7 w-full gap-0">{daysInMonth()}</div>
        </div>
        {hasTimings && (
          <div className="bg-white border-t border-b border-r border-black">
            {!showForm ? renderTimings() : renderForm()}
          </div>
        )}
      </div>
    </div>
  );
};
