import React from "react";
import "./BookingCalendar.css";
/**
 * Primary UI component for user interaction
 */
interface CalendarProps {
    validateDateFunction: (date: Date) => boolean;
    errorMessage: string;
    handleError: (msg: string) => void;
}
export declare const Calendar: ({ validateDateFunction, errorMessage, handleError, }: CalendarProps) => React.JSX.Element;
export default Calendar;
