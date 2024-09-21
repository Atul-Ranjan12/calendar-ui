import React from "react";
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
export declare const DatePicker: ({ validateDateFunction, onDateSelect, errorMessage, handleError, placeholder, darkMode, customDateFormatter, inputStyles, }: DatePickerProps) => React.JSX.Element;
export {};
