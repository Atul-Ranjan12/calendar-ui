import React from "react";
import "./BookingCalendar.css";
/**
 * Primary UI component for user interaction
 */
interface BookingCalendarProps {
    name: string;
    hasFetcher: boolean;
    getAvailableDates: () => Promise<string[]>;
    getAvailableDatesErrorRollback: () => void;
    setDateUserFormData: (date: string) => void;
    dateFormatterFunction?: (date: Date) => string;
    reservationDayName: string;
    wrongDateErrorMessage: string;
    errorToast: (msg: string) => void;
}
export declare const BookingCalendar: ({ setDateUserFormData, dateFormatterFunction, reservationDayName, errorToast, wrongDateErrorMessage, hasFetcher, getAvailableDates, getAvailableDatesErrorRollback, }: BookingCalendarProps) => React.JSX.Element;
export default BookingCalendar;
