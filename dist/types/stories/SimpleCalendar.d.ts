import React from "react";
import "./output.css";
interface SimpleCalendarProps {
    validateDateFunction: (date: Date) => boolean;
    errorMessage: string;
    handleError: (msg: string) => void;
    darkMode?: boolean;
}
export declare const SimpleCalendar: ({ validateDateFunction, errorMessage, handleError, darkMode, }: SimpleCalendarProps) => React.JSX.Element;
export {};
