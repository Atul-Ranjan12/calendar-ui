import React from "react";
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
    customProceedFunction?: () => void;
    formFillData?: FormData[];
    onFormFillAction?: (formData: {
        [key: string]: string;
    }) => {};
}
export declare const SimpleReservationCalendar: ({ validateDateFunction, errorMessage, handleError, onDateSelect, reservationDates, customProceedFunction, onFormFillAction, formFillData, darkMode, }: SimpleReservationCalendarProps) => React.JSX.Element;
export {};
