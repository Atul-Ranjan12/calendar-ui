import React from "react";
import "./output.css";
interface SimpleCalendarProps {
    validateDateFunction: (date: Date) => boolean;
    errorMessage: string;
    handleError: (msg: string) => void;
    darkMode?: boolean;
    onDateSelect: (date: Date) => void;
    message: string;
}
export declare const SimpleCalendar: ({ validateDateFunction, errorMessage, handleError, onDateSelect, message, darkMode, }: SimpleCalendarProps) => React.JSX.Element;
export {};
