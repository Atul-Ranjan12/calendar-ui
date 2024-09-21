import React from "react";
import "./output.css";
interface RangeDatePickerProps {
    validateDateFunction?: (date: Date) => boolean;
    validateRange?: (startDate: Date, endDate: Date) => boolean;
    onRangeSelect: (startDate: Date, endDate: Date) => void;
    handleError?: (msg: string) => void;
    errorMessage?: string;
    rangeInvalidErrorMessage?: string;
    customDateFormatter?: (date: Date) => string;
    darkMode?: boolean;
    placeholderStart?: string;
    placeholderEnd?: string;
    inputStyles?: React.CSSProperties;
}
export declare const RangeDatePicker: ({ validateDateFunction, validateRange, onRangeSelect, handleError, errorMessage, rangeInvalidErrorMessage, customDateFormatter, darkMode, placeholderStart, placeholderEnd, inputStyles, }: RangeDatePickerProps) => React.JSX.Element;
export {};
