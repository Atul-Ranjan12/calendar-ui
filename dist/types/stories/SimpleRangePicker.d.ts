import React from "react";
import "./output.css";
interface SimpleRangePickerProps {
    validateDateFunction?: (date: Date) => boolean;
    validateRange?: (startDate: Date, endDate: Date) => boolean;
    rangeSelected: (startDate: Date, endDate: Date) => void;
    handleRangeInvalidError: (msg: string) => void;
    rangeInvalidErrorMessage: string;
    errorMessage: string;
    handleError: (msg: string) => void;
    darkMode?: boolean;
}
export declare const SimpleRangePicker: ({ validateDateFunction, errorMessage, handleError, validateRange, rangeSelected, handleRangeInvalidError, rangeInvalidErrorMessage, darkMode, }: SimpleRangePickerProps) => React.JSX.Element;
export {};
