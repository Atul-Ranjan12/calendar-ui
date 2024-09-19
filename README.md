# Gott-Calendar-UI

A simple and elegant booking calendar to get things done simply for
React. This library along with this component will feature many other
calendar features that can be easily integrated into your react-app.
(coming soon in the next versions).

The calendar is easy to use, intuitive, and good looking for
integrations

<img width="995" alt="Screen Shot 2024-09-19 at 17 54 40" src="https://github.com/user-attachments/assets/6911819b-058c-4211-86f6-bd380ac66ac8">

<img width="989" alt="Screen Shot 2024-09-19 at 17 54 58" src="https://github.com/user-attachments/assets/22420d35-f8be-483e-a545-b34b5334fc9d">



## Features

- **Responsive Design**: Automatically adjusts to different screen sizes.
- **Seamless Integration**: Allows the integration of a function to fetch
  all the available dates from the backend (whatever it may be) or similar logic
- **Function for form handling**: Allows function to handle forms here
- **Custom Date Formatting**: Allows the integration of custom date formatting functions.
- **Error Handling**: Displays custom error messages when a user selects an invalid date.
- **Weekend Highlighting**: Clearly distinguishes weekends from weekdays.
- **Supports Dark Mode**: (Coming soon)

## Installation

Install the component using npm:

```bash
npm install gott-calendar-ui
```

or using yarn

```bash
yarn add gott-calendar-ui
```

## SimpleRangePicker Component

The `SimpleRangePicker` is a React component that allows users
to select a date range. It provides features like custom date validation, error handling, and dark mode support.

````tsx
import SimpleRangePicker from "./SimpleRangePicker";

const handleRangeSelection = (startDate, endDate) => {
  console.log(`Selected range: ${startDate} to ${endDate}`);
};

const handleError = (msg) => {
  console.error(msg);
};

const App = () => (
  <SimpleRangePicker
    validateDateFunction={(date) => date >= new Date()}
    errorMessage="Selected date is in the past."
    handleError={handleError}
    validateRange={(startDate, endDate) => endDate - startDate <= 7 * 24 * 60 * 60 * 1000} // Max 7 days range
    rangeSelected={handleRangeSelection}
    handleRangeInvalidError={(msg) => alert(msg)}
    rangeInvalidErrorMessage="The selected range is too long."
    darkMode={false}
  />
);
````


## Props

The `SimpleRangePicker` component accepts the following props

### `validateDateFunction` (optional)

-   **Type**: `(date: Date) => boolean`
-   **Description**: A function to validate individual dates before selection. If this function returns `false`, the date will be considered invalid, and the `handleError` function will be called with the `errorMessage`.

### `validateRange` (optional)

-   **Type**: `(startDate: Date, endDate: Date) => boolean`
-   **Description**: A function to validate the selected date range. If the function returns `false`, the `handleRangeInvalidError` function will be called with the `rangeInvalidErrorMessage`.

### `rangeSelected`

-   **Type**: `(startDate: Date, endDate: Date) => void`
-   **Description**: Callback function that is called when a valid date range is selected.

### `handleRangeInvalidError`

-   **Type**: `(msg: string) => void`
-   **Description**: Callback function that is called when the selected date range is invalid. The `rangeInvalidErrorMessage` will be passed as an argument.

### `rangeInvalidErrorMessage`

-   **Type**: `string`
-   **Description**: The error message to display when an invalid date range is selected.

### `errorMessage`

-   **Type**: `string`
-   **Description**: The error message to display when an individual date selection is invalid.

### `handleError`

-   **Type**: `(msg: string) => void`
-   **Description**: Callback function that is called when an individual date is invalid according to the `validateDateFunction`. The `errorMessage` will be passed as an argument.

### `darkMode` (optional)

-   **Type**: `boolean`
-   **Default**: `true`

-   **Description**: Determines if the component should be rendered in dark mode. If `true`, the component will use dark colors.

## State

-   `currentDate`: The currently displayed month in the calendar.
-   `rangeStart`: The start date of the selected range.
-   `rangeEnd`: The end date of the selected range.
-   `hoverDate`: The date that the mouse is currently hovering over.
-   `selectedRange`: A string representation of the selected date range.


## SimpleCalendar Component

The `SimpleCalendar` is a React component that allows users to select individual dates from a calendar. It includes features for custom date validation, error handling, and optional dark mode support.


````tsx
import React, { useState } from "react";
import "./output.css";

interface SimpleCalendarProps {
  validateDateFunction: (date: Date) => boolean;
  errorMessage: string;
  handleError: (msg: string) => void;
  darkMode?: boolean; // Optional prop for dark mode
  handleDateSelect: (date: Date) => void;
}

export const SimpleCalendar = ({
  validateDateFunction,
  errorMessage,
  handleError,
  handleDateSelect,
  darkMode = false, // Default to light mode
}: SimpleCalendarProps) => {
  // Component implementation
};
````

### Props

The `SimpleCalendar` component accepts the following props:

-   **`validateDateFunction`**

    -   **Type**: `(date: Date) => boolean`
    -   **Description**: A function to validate the date selected by the user. If the function returns `false`, the date is considered invalid, and the `handleError` function will be called with the `errorMessage`.

-   **`errorMessage`**

    -   **Type**: `string`
    -   **Description**: The error message to display when an invalid date is selected according to the `validateDateFunction`.

-   **`handleError`**

    -   **Type**: `(msg: string) => void`
    -   **Description**: Callback function that is called when an invalid date is selected. The `errorMessage` will be passed as an argument.

-   **`darkMode`** (optional)

    -   **Type**: `boolean`
    -   **Default**: `false`
    -   **Description**: Determines if the component should be rendered in dark mode. If `true`, the component will use a dark color scheme. Defaults to light mode when not provided.

-   **`handleDateSelect`**

    -   **Type**: `(date: Date) => void`
    -   **Description**: A callback function that is called when a date is selected. The selected date is passed as an argument.


### Rendering

The component renders a calendar interface with the following features:

-   **Month Navigation**: Buttons to navigate to the previous and next months.
-   **Weekday Headers**: Displays the days of the week (Sun-Sat).
-   **Date Cells**: Each date is displayed in a cell, with styles applied for the current day, selected day, and weekends.
-   **Legend**: A legend at the bottom explains the color coding for the current date and selected date.

### Example Usage


````tsx
const handleDateError = (msg: string) => {
  console.error(msg);
};

const handleDateSelect = (date: Date) => {
  console.log("Selected date:", date);
};

const App = () => (
  <SimpleCalendar
    validateDateFunction={(date) => date >= new Date()}
    errorMessage="Selected date is in the past."
    handleError={handleDateError}
    handleDateSelect={handleDateSelect}
    darkMode={true}
  />
);
````

In this example, the `SimpleCalendar` component:

-   Validates dates to ensure they are not in the past.
-   Displays an error message when an invalid date is selected.
-   Calls `handleDateSelect` with the selected date when a valid date is clicked.
-   Renders in dark mode.


## Calendar Component

For calendar tasks with simple requirements
and date picking requirements, also includes custom functions to validate dates

### Example Usage
```tsx
"use client";
import React from "react";
import { BookingCalendar, Calendar } from "gott-calendar-ui";

export default function Home() {
  const handleDateSelection = (date: string) => {
    console.log("Selected date:", date);
  };

  const handleError = (message: string) => {
    console.log("Selected date:", message);
  };

  const getAvailableDates = async () => {
    const dates = await ["2024-09-09"];
    return dates;
  };

  const getAvailableDatesRollback = () => {
    return;
  };

  return (
    <main>
      <section className="p-32 h-screen w-screen flex items-center justify-center">
        <div className="p-32">
          <Calendar
            validateDateFunction={() => true}
            errorMessage="Invalid date"
            handleError={() => {}}
          />
        </div>
      </section>
    </main>
  );
}
````

## Props

The `Calendar` component accepts the following props:

### `validateDateFunction`

- **Type:** `(date: Date) => boolean`
- **Description:** A function that validates if a given date is selectable. It should return `true` if the date is valid, and `false` otherwise.
- **Required:** Yes

### `errorMessage`

- **Type:** `string`
- **Description:** The error message displayed when an invalid date is selected.
- **Required:** Yes

### `handleError`

- **Type:** `(msg: string) => void`
- **Description:** A function that handles displaying error messages. It receives the `errorMessage` string when an invalid date is clicked.
- **Required:** Yes

## Booking Calendar Component

For calendar tasks with reservation requirements and date validation for specific dates

### Example Usage

Here's a basic example of how to use the BookingCalendar component in your React application:

```jsx
import React from "react";
import { BookingCalendar } from "gott-calendar-ui";

const App = () => {
  const handleDateSelection = (date) => {
    console.log("Selected date:", date);
  };

  const handleError = (message) => {
    alert(message);
  };

  return (
    <BookingCalendar
      name="Booking Calendar"
      setDateUserFormData={handleDateSelection}
      reservationDayName="Workshop Day"
      wrongDateErrorMessage="This date is unavailable. Please select another date."
      errorToast={handleError}
    />
  );
};

export default App;
```

### Props

The `BookingCalendar` component accepts the following props:

- **`name`**: `string` - The name of the calendar.
- **`setDateUserFormData`**: `function` - A function to handle the selected date.
- **`dateFormatterFunction`**: `function` (optional) - A custom function to format dates.
- **`reservationDayName`**: `string` - The name displayed on the calendar for available dates.
- **`wrongDateErrorMessage`**: `string` - The error message displayed when an unavailable date is selected.
- **`errorToast`**: `function` - A function to display error messages.

## Documentation

## Props

### `name`

- **Type:** `string`
- **Description:** The name of the booking calendar, primarily used to identify it within a larger application.

### `hasFetcher`

- **Type:** `boolean`
- **Description:** A flag that determines whether the calendar should fetch available dates from the backend.
- **Usage:** Set to `true` if the `getAvailableDates` function is provided and dates need to be fetched; otherwise, set to `false`.

### `getAvailableDates`

- **Type:** `() => Promise<string[]>`
- **Description:** An optional asynchronous function that fetches available dates from the backend. The function should return a promise that resolves with an array of available dates in the format `"yyyy-mm-dd"`.
- **Required:** No, but it should be provided if `hasFetcher` is set to `true`.

### `getAvailableDatesErrorRollback`

- **Type:** `() => void`
- **Description:** An optional function that triggers a rollback or other error-handling procedure if fetching available dates fails.
- **Required:** No, but it should be provided if `hasFetcher` is set to `true`.

### `setDateUserFormData`

- **Type:** `(date: string) => void`
- **Description:** A function that handles the selected date when a user clicks on a date. The function receives the clicked date as a string in the format `"yyyy-mm-dd"`.
- **Required:** Yes, this prop is mandatory for the component to work correctly.

### `dateFormatterFunction`

- **Type:** `(date: Date) => string`
- **Description:** An optional function that formats a JavaScript `Date` object into a string. If not provided, the date is formatted as `"yyyy-mm-dd"` by default.
- **Required:** No, it's optional. If not provided, the default ISO string format will be used.

### `reservationDayName`

- **Type:** `string`
- **Description:** A label name that represents what the reservation is for. This name is displayed in the calendar legend.
- **Example:** "Workshop day"
- **Required:** Yes, to provide context within the calendar.

### `wrongDateErrorMessage`

- **Type:** `string`
- **Description:** An error message that is displayed when a user clicks on a date that is not available for booking.
- **Required:** Yes, this is needed to provide feedback when an invalid date is selected.

### `errorToast`

- **Type:** `(msg: string) => void`
- **Description:** A function that displays an error message to the user. It receives the `wrongDateErrorMessage` string when an unavailable date is clicked.
- **Required:** Yes, to handle error messaging.

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request with your changes.

GitHb: https://github.com/Atul-Ranjan12/calendar-ui

## Contact

Visit:
https://gottdata.com

Reach out to me at:
LinkedIn:
https://www.linkedin.com/in/atul-ranjan-83025622a/

## License

This project is licensed under the MIT License. See the LICENSE file for details.
