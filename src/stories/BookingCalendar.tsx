import React, { useState, useContext, useEffect } from "react";
import "./BookingCalendar.css";

/*
TODO: These are the things TO-DO at the moment
1. Fix the responsiveness of the calendar
2. Create a dark mode version

// Please add any suggestions here
*/

/**
 * Primary UI component for user interaction
 */
interface BookingCalendarProps {
  // This is the interface containing the props for the
  // calendar
  name: string;
  // Function to get available dates from the backend
  // set hasFetcher = false to skip getting available dates
  hasFetcher: boolean;
  getAvailableDates: () => Promise<string[]>;

  // Function to set off a rollback in case of failure to
  // fetch dates
  getAvailableDatesErrorRollback: () => void;

  // Function to handle the user form when a date is
  // clicked
  setDateUserFormData: (date: string) => void;
  // Function to handle the dateFormatter when
  // added by the user
  dateFormatterFunction?: (date: Date) => string;
  // Reservation name to show on labels
  // Example "Workshop daty"
  reservationDayName: string;
  // Function to display an error when clicked on
  // the wrong date and the error message itself
  wrongDateErrorMessage: string;
  errorToast: (msg: string) => void;
}

// Booking Calendar itself
export const BookingCalendar = ({
  setDateUserFormData,
  dateFormatterFunction,
  reservationDayName,
  errorToast,
  wrongDateErrorMessage,
  hasFetcher,
  getAvailableDates,
  getAvailableDatesErrorRollback,
}: BookingCalendarProps) => {
  // State to store the current date
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  // State to store the available dates so as for the calendar
  // to display
  // Date format is "yyyy-dd-mm"
  const [availableDates, setAvailableDates] = useState<string[]>([
    // This is an example date format
    // "2024-08-30",
  ]);

  // This effect fetches any data that is required
  // if required from the server, or simply to add available dates
  useEffect(() => {
    const fetchData = async () => {
      if (!hasFetcher) return;

      try {
        const avDates = await getAvailableDates();

        setAvailableDates(avDates);
      } catch (error) {
        getAvailableDatesErrorRollback();
      }
    };

    fetchData();
  }, [getAvailableDates, getAvailableDatesErrorRollback, hasFetcher]);

  // This function handles when a particular date
  // has been clicked
  const dateClicked = (day: Date) => {
    // Set next day
    const nextDay = new Date(day);
    nextDay.setDate(nextDay.getDate() + 1);

    // Format the date
    // Add custom functionality to format a date
    let formattedDate = undefined;
    if (dateFormatterFunction) {
      formattedDate = dateFormatterFunction(nextDay);
    } else {
      formattedDate = nextDay.toISOString().split("T")[0];
    }

    if (availableDates.includes(formattedDate)) {
      setCurrentDate(day);
      // Here we call the function for the
      // user to be able to handle the set user date
      // form data
      setDateUserFormData(formattedDate);
    } else {
      // Handle error here
      errorToast(wrongDateErrorMessage);
    }
  };

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
      const isCurrentDay =
        day === new Date().getDate() &&
        currentDate.getMonth() === new Date().getMonth() &&
        currentDate.getFullYear() === new Date().getFullYear();

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
            onClick={() => {
              const clickedDate = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                day,
              );

              dateClicked(clickedDate);
            }}
            className={`flex items-center justify-center w-10 h-10 md:w-16 md:h-16 text-sm font-poppins text-center rounded-full hover:scale-105 duration-200 hover:cursor-pointer ${
              isCurrentDay
                ? "bg-emerald-200"
                : currentDate.getDate() === day &&
                    availableDates.includes(formattedDate)
                  ? "bg-emerald-500"
                  : isSaturday || isSunday
                    ? "bg-red-100"
                    : availableDates.includes(formattedDate)
                      ? "bg-cyan-500"
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
      {availableDates.length === 0 && (
        <div className="h-full w-full absolute top-0 left-0 backdrop-blur-sm flex items-center justify-center">
          <div className="p-12 bg-white border border-black flex flex-col space-y-4 items-center justify-center shadow-sm">
            <span className="font-poppins text-black text-2xl font-bold">
              Dates to be decided for reservation
            </span>
            <span className="font-poppins text-slate-600 text-xl ">
              Please come back later
            </span>
          </div>
        </div>
      )}
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
          <div className="w-4 h-4 bg-cyan-500 rounded-full"></div>
          <h6 className="text-xs font-light font-poppins">
            {reservationDayName}
          </h6>
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

export default BookingCalendar;
