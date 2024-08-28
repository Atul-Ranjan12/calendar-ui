import { __awaiter, __generator } from "tslib";
import React, { useState, useEffect } from "react";
// Booking Calendar itself
export var BookingCalendar = function (_a) {
    var setDateUserFormData = _a.setDateUserFormData, dateFormatterFunction = _a.dateFormatterFunction, reservationDayName = _a.reservationDayName, errorToast = _a.errorToast, wrongDateErrorMessage = _a.wrongDateErrorMessage, hasFetcher = _a.hasFetcher, getAvailableDates = _a.getAvailableDates, getAvailableDatesErrorRollback = _a.getAvailableDatesErrorRollback;
    // State to store the current date
    var _b = useState(new Date()), currentDate = _b[0], setCurrentDate = _b[1];
    // State to store the available dates so as for the calendar
    // to display
    // Date format is "yyyy-dd-mm"
    var _c = useState([
    // This is an example date format
    // "2024-08-30",
    ]), availableDates = _c[0], setAvailableDates = _c[1];
    // This effect fetches any data that is required
    // if required from the server, or simply to add available dates
    useEffect(function () {
        var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var avDates, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!hasFetcher)
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, getAvailableDates()];
                    case 2:
                        avDates = _a.sent();
                        setAvailableDates(avDates);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        getAvailableDatesErrorRollback();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchData();
    }, [getAvailableDates, getAvailableDatesErrorRollback, hasFetcher]);
    // This function handles when a particular date
    // has been clicked
    var dateClicked = function (day) {
        // Set next day
        var nextDay = new Date(day);
        nextDay.setDate(nextDay.getDate() + 1);
        // Format the date
        // Add custom functionality to format a date
        var formattedDate = undefined;
        if (dateFormatterFunction) {
            formattedDate = dateFormatterFunction(nextDay);
        }
        else {
            formattedDate = nextDay.toISOString().split("T")[0];
        }
        if (availableDates.includes(formattedDate)) {
            setCurrentDate(day);
            // Here we call the function for the
            // user to be able to handle the set user date
            // form data
            setDateUserFormData(formattedDate);
        }
        else {
            // Handle error here
            errorToast(wrongDateErrorMessage);
        }
    };
    // This function handles going to the previous month
    var goToPrevMonth = function () {
        setCurrentDate(function (prevDate) {
            var prevMonthDate = new Date(prevDate);
            prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);
            prevMonthDate.setDate(new Date().getDate());
            return prevMonthDate;
        });
    };
    // This function handles going to the next month
    var goToNextMonth = function () {
        setCurrentDate(function (prevDate) {
            var nextMonthDate = new Date(prevDate);
            nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
            nextMonthDate.setDate(new Date().getDate());
            return nextMonthDate;
        });
    };
    // Function to fetch and calculate days in month and fill in the UI as necessary
    var daysInMonth = function () {
        var days = [];
        var firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        var startingDay = firstDayOfMonth.getDay();
        var numDaysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        for (var i = 0; i < startingDay; i++) {
            days.push(<span key={"empty-".concat(i)} className="p-10"></span>);
        }
        var _loop_1 = function (day) {
            var isCurrentDay = day === new Date().getDate() &&
                currentDate.getMonth() === new Date().getMonth() &&
                currentDate.getFullYear() === new Date().getFullYear();
            var isSaturday = (startingDay + day - 1) % 7 === 6;
            var isSunday = (startingDay + day - 1) % 7 === 0;
            var formattedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day + 1)
                .toISOString()
                .split("T")[0];
            days.push(<div className="flex items-center justify-center w-full" key={day}>
          <div onClick={function () {
                    var clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                    dateClicked(clickedDate);
                }} className={"flex items-center justify-center w-10 h-10 md:w-16 md:h-16 text-sm font-poppins text-center rounded-full hover:scale-105 duration-200 hover:cursor-pointer ".concat(isCurrentDay
                    ? "bg-emerald-200"
                    : currentDate.getDate() === day &&
                        availableDates.includes(formattedDate)
                        ? "bg-emerald-500"
                        : isSaturday || isSunday
                            ? "bg-red-100"
                            : availableDates.includes(formattedDate)
                                ? "bg-cyan-500"
                                : "bg-slate-100")}>
            {day}
          </div>
        </div>);
        };
        for (var day = 1; day <= numDaysInMonth; day++) {
            _loop_1(day);
        }
        return days;
    };
    return (<div className="relative w-full h-full flex flex-col p-2 md:p-4 border border-black shadow-md bg-white">
      {availableDates.length === 0 && (<div className="h-full w-full absolute top-0 left-0 backdrop-blur-sm flex items-center justify-center">
          <div className="p-12 bg-white border border-black flex flex-col space-y-4 items-center justify-center shadow-sm">
            <span className="font-poppins text-black text-2xl font-bold">
              Dates to be decided for reservation
            </span>
            <span className="font-poppins text-slate-600 text-xl ">
              Please come back later
            </span>
          </div>
        </div>)}
      <div className="flex flex-row justify-between items-center md:p-2 rounded">
        <button className="p-2 px-6 text-black uppercase font-poppins font-light text-lg hover:scale-110" onClick={goToPrevMonth}>
          Prev
        </button>
        <span className="text-gray-600 font-poppins text-md">
          {currentDate.toLocaleDateString("default", {
            month: "long",
            year: "numeric",
        })}
        </span>
        <button className="p-2 px-6  text-black uppercase font-poppins font-light text-lg hover:scale-110" onClick={goToNextMonth}>
          Next
        </button>
      </div>
      <div className="grid grid-cols-7 w-full gap-4">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(function (day) { return (<div key={day} className="flex items-center justify-center p-2 md:p-8 text-xs font-poppins uppercase text-slate-600 rounded-full">
            {day}
          </div>); })}
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
    </div>);
};
export default BookingCalendar;
//# sourceMappingURL=BookingCalendar.jsx.map