# Gott-Calendar-UI

- TypeScript, React
- Version 0.3.38 features a complete set of calendars, date-pickers, range date pickers and more

A simple and elegant booking calendar to get things done simply for
React.

This library includes all the calendar component you could ask for in
your react application, from date pickers to full scale reservation calendars
out of the box with straight and easy implementation.

The calendar is easy to use, intuitive, and good looking for
integrations

<img width="985" alt="Screen Shot 2024-09-20 at 17 39 55" src="https://github.com/user-attachments/assets/420e6fba-c0fb-49c5-a1a2-21ca6e24bd21">

## Components:

- **SimpleReservationCalendar**: The only reservation calendar your project needs with features to include timings, pick dates, enter form fields, etc
- **DatePicker**: A simple, elegant date picker component for react for normal use
- **RangeDatePicker**: A simple, elegant, range picker component to allow for date selections with a range
- **SimpleCalendar**: A large simple calendar component to pick dates
- **SimpleRangePicker**: A large simple calendar component to pick dates

## Features

- **Responsive Design**: Automatically adjusts to different screen sizes.
- **Seamless Integration**: Allows the integration of a function to fetch
  all the available dates from the backend (whatever it may be) or similar logic
- **Function for form handling**: Allows function to handle forms here
- **Custom Date Formatting**: Allows the integration of custom date formatting functions.
- **Error Handling**: Displays custom error messages when a user selects an invalid date.
- **Weekend Highlighting**: Clearly distinguishes weekends from weekdays.
- **Supports Dark Mode**: Support for datrk mode user interfaces with prop

## Installation

Install the component using npm:

```bash
npm install gott-calendar-ui
```

or using yarn

```bash
yarn add gott-calendar-ui
```

## SimpleReservationCalendar Component

The SimpleReservationCalendar is a React component that provides a customizable calendar interface for making reservations. It supports date selection, time slot selection, and optional form filling.

### Props

The component accepts the following props:

- `validateDateFunction: (date: Date) => boolean`: A function to validate selected dates.
- `errorMessage: string`: Error message to display when date validation fails.
- `handleError: (msg: string) => void`: Function to handle error messages.
- `darkMode?: boolean`: Optional. Enables dark mode styling when true.
- `onDateSelect: (date: Date, timing?: string) => void`: Callback function when a date (and optionally a time) is selected.
- `reservationDates?: ReservationDate[]`: Optional. Array of available reservation dates with their respective time slots.
- `customProceedFunction?: () => void`: Optional. Custom function to execute when proceeding with the reservation.
- `formFillData?: FormData[]`: Optional. Array of form fields to display for additional information.
- `onFormFillAction?: (formData: { [key: string]: string }) => {}`: Optional. Function to execute when the form is submitted.

## Interfaces

### ReservationDate

```typescript
interface ReservationDate {
  date: Date;
  numSlots: number;
  timings?: string[];
}
```

### FormData

```typescript
interface FormData {
  name: string;
  labelName: string;
  placeholder: string;
}
```

## Features

1. **Calendar Display**: Shows a monthly calendar with navigation controls.
2. **Date Selection**: Allows users to select available dates.
3. **Time Slot Selection**: If available, displays time slots for selected dates.
4. **Dark Mode**: Supports a dark color scheme for better visibility in low-light environments.
5. **Form Integration**: Can display a customizable form for additional information gathering.
6. **Responsive Design**: Adapts to different screen sizes for optimal user experience.

## Usage

To use the SimpleReservationCalendar component:

1. Import the component into your React application.
2. Provide the required props, including validation function, error handling, and date selection callback.
3. Optionally provide reservation dates, custom proceed function, or form data as needed.

## Basic Usage

Here's a basic example of how to use the SimpleReservationCalendar component:

```jsx
import React from "react";
import { SimpleReservationCalendar } from "gott-calendar-ui";

function App() {
  const handleDateSelect = (date, timing) => {
    console.log("Selected date:", date, "Timing:", timing);
  };

  const handleError = (errorMessage) => {
    console.error("Reservation Error:", errorMessage);
  };

  return (
    <SimpleReservationCalendar
      validateDateFunction={(date) => date >= new Date()}
      onDateSelect={handleDateSelect}
      handleError={handleError}
      errorMessage="This date is not available for reservation."
      darkMode={false}
    />
  );
}

export default App;
```

## Advanced Usage with All Props

For a more comprehensive setup, you can utilize all available props:

```jsx
import React from 'react';
import { SimpleReservationCalendar } from 'gott-calendar-ui';
import { sampleReservationDates, sampleFormFields } from './sampleData';

export const sampleReservationDates: ReservationDate[] = [
  {
    date: new Date(2024, 8, 20), // September 20, 2024
    numSlots: 3,
    timings: ["09:00 AM", "02:00 PM", "06:00 PM"],
  },
  {
    date: new Date(2024, 8, 21), // September 21, 2024
    numSlots: 2,
    timings: ["10:00 AM", "03:00 PM"],
  },
  {
    date: new Date(2024, 8, 23), // September 23, 2024
    numSlots: 4,
    timings: ["08:00 AM", "11:00 AM", "02:00 PM", "05:00 PM"],
  },
];

export const sampleFormFields: FormData[] = [
  {
    name: "fullName",
    labelName: "Full name",
    placeholder: "Enter your full name",
  },
  {
    name: "email",
    labelName: "Email Address",
    placeholder: "Enter your email address",
  },
  {
    name: "organization",
    labelName: "Organization",
    placeholder: "Enter your organization name",
  },
];

function AdvancedReservationApp() {
  const validateDate = (date) => {
    // Custom date validation logic
    const today = new Date();
    return date >= today && date <= new Date(today.getFullYear(), today.getMonth() + 3, today.getDate());
  };

  const handleDateSelect = (date, timing) => {
    console.log('Reservation selected for:', date, 'at', timing);
  };

  const handleError = (errorMessage) => {
    // Display error in your preferred UI component
    alert(errorMessage);
  };

  const handleFormSubmit = (formData) => {
    console.log('Form submitted with data:', formData);
    // Process the form data (e.g., send to backend)
  };

  const customProceed = () => {
    console.log('Custom proceed action triggered');
    // Implement your custom logic here
  };

  return (
    <SimpleReservationCalendar
      validateDateFunction={validateDate}
      onDateSelect={handleDateSelect}
      handleError={handleError}
      errorMessage="Selected date is not available or out of range."
      darkMode={false}
      reservationDates={sampleReservationDates}
      formFillData={sampleFormFields}
      onFormFillAction={handleFormSubmit}
      customProceedFunction={customProceed}
    />
  );
}

export default AdvancedReservationApp;
```

## Customization

The component can be customized by:

- Providing custom validation logic
- Specifying available dates and time slots
- Implementing a custom proceed function
- Defining form fields for additional data collection
- Toggling dark mode

## Accessibility

The component includes basic accessibility features such as keyboard navigation and semantic HTML structure. However, additional testing and enhancements may be required for full accessibility compliance.

## Notes

- Ensure that all required props are provided to avoid runtime errors.
- The component relies on CSS classes defined in "output.css" for styling.
- Form submission and custom proceed functionality should be implemented in the parent component.

<img width="995" alt="Screen Shot 2024-09-19 at 17 54 40" src="https://github.com/user-attachments/assets/6911819b-058c-4211-86f6-bd380ac66ac8">

## SimpleRangePicker Component

The `SimpleRangePicker` is a React component that allows users
to select a date range. It provides features like custom date validation, error handling, and dark mode support.

```tsx
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
    validateRange={(startDate, endDate) => {
      return true;
    }}
    rangeSelected={handleRangeSelection}
    handleRangeInvalidError={(msg) => alert(msg)}
    rangeInvalidErrorMessage="The selected range is too long."
    darkMode={false}
  />
);
```

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

<img width="989" alt="Screen Shot 2024-09-19 at 17 54 58" src="https://github.com/user-attachments/assets/22420d35-f8be-483e-a545-b34b5334fc9d">

## SimpleCalendar Component

The `SimpleCalendar` is a React component that allows users to select individual dates from a calendar. It includes features for custom date validation, error handling, and optional dark mode support.

```tsx
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
```

### Props

The `SimpleCalendar` component accepts the following props:

- **`validateDateFunction`**

  - **Type**: `(date: Date) => boolean`
  - **Description**: A function to validate the date selected by the user. If the function returns `false`, the date is considered invalid, and the `handleError` function will be called with the `errorMessage`.

- **`errorMessage`**

  - **Type**: `string`
  - **Description**: The error message to display when an invalid date is selected according to the `validateDateFunction`.

- **`handleError`**

  - **Type**: `(msg: string) => void`
  - **Description**: Callback function that is called when an invalid date is selected. The `errorMessage` will be passed as an argument.

- **`darkMode`** (optional)

  - **Type**: `boolean`
  - **Default**: `false`
  - **Description**: Determines if the component should be rendered in dark mode. If `true`, the component will use a dark color scheme. Defaults to light mode when not provided.

- **`handleDateSelect`**

  - **Type**: `(date: Date) => void`
  - **Description**: A callback function that is called when a date is selected. The selected date is passed as an argument.

### Rendering

The component renders a calendar interface with the following features:

- **Month Navigation**: Buttons to navigate to the previous and next months.
- **Weekday Headers**: Displays the days of the week (Sun-Sat).
- **Date Cells**: Each date is displayed in a cell, with styles applied for the current day, selected day, and weekends.
- **Legend**: A legend at the bottom explains the color coding for the current date and selected date.

### Example Usage

```tsx
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
```

In this example, the `SimpleCalendar` component:

- Validates dates to ensure they are not in the past.
- Displays an error message when an invalid date is selected.
- Calls `handleDateSelect` with the selected date when a valid date is clicked.
- Renders in dark mode.

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
```

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

## DatePicker Component

The DatePicker is a React component that provides a customizable calendar interface for selecting a single date. It supports date validation, custom formatting, and optional dark mode styling.

### Props

The component accepts the following props:

- `validateDateFunction?: (date: Date) => boolean`: Optional function to validate selected dates.
- `errorMessage?: string`: Optional custom error message for invalid date selection.
- `handleError?: (msg: string) => void`: Optional function to handle error messages.
- `customDateFormatter?: (date: Date) => string`: Optional function to format the selected date.
- `darkMode?: boolean`: Optional. Enables dark mode styling when true.
- `onDateSelect: (date: Date) => void`: Callback function when a date is selected.
- `placeholder?: string`: Optional placeholder text for the input field.
- `inputStyles?: React.CSSProperties`: Optional custom styles for the input field.

## Features

1. **Calendar Display**: Shows a monthly calendar with navigation controls.
2. **Date Selection**: Allows users to select a single date.
3. **Date Validation**: Supports custom date validation logic.
4. **Custom Formatting**: Allows custom formatting of the selected date.
5. **Dark Mode**: Supports a dark color scheme for better visibility in low-light environments.
6. **Responsive Design**: Adapts to different screen sizes for optimal user experience.
7. **Customizable Input**: Allows custom styling and placeholder for the input field.

## Usage

To use the DatePicker component:

1. Import the component into your React application.
2. Provide the required `onDateSelect` prop and any optional props as needed.
3. Handle the selected date in your application logic.

## Basic Usage

Here's a basic example of how to use the DatePicker component:

```jsx
import React from "react";
import { DatePicker } from "gott-calendar-ui";

function App() {
  const handleDateSelect = (date) => {
    console.log("Selected date:", date);
  };

  return (
    <DatePicker onDateSelect={handleDateSelect} placeholder="Select a date" />
  );
}

export default App;
```

## Advanced Usage with All Props

For a more comprehensive setup, you can utilize all available props:

```jsx
import React from "react";
import { DatePicker } from "gott-calendar-ui";

function AdvancedDatePickerApp() {
  const validateDate = (date) => {
    const today = new Date();
    return date >= today;
  };

  const handleDateSelect = (date) => {
    console.log("Selected date:", date);
  };

  const handleError = (errorMessage) => {
    alert(errorMessage);
  };

  const customFormatter = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <DatePicker
      validateDateFunction={validateDate}
      onDateSelect={handleDateSelect}
      handleError={handleError}
      errorMessage="Please select a future date."
      customDateFormatter={customFormatter}
      darkMode={true}
      placeholder="Choose your preferred date"
      inputStyles={{ fontFamily: "Arial", fontSize: "14px" }}
    />
  );
}

export default AdvancedDatePickerApp;
```

## Customization

The component can be customized by:

- Providing custom date validation logic
- Implementing custom error handling
- Defining a custom date formatter
- Toggling dark mode
- Customizing the input field's placeholder and styles

## Accessibility

The component includes basic accessibility features such as keyboard navigation and semantic HTML structure. However, additional testing and enhancements may be required for full accessibility compliance.

## Notes

- Ensure that the `onDateSelect` prop is always provided to handle the selected date.
- The component relies on CSS classes defined in "output.css" for styling.
- The calendar will close when clicking outside of it or when a date is selected.
- Weekend days (Saturday and Sunday) are visually distinguished in the calendar.

## SimpleReservationCalendar Component

The SimpleReservationCalendar is a React component that provides a customizable calendar interface for making reservations. It supports date selection, time slot selection, and optional form filling.

### Props

The component accepts the following props:

- `validateDateFunction: (date: Date) => boolean`: A function to validate selected dates.
- `errorMessage: string`: Error message to display when date validation fails.
- `handleError: (msg: string) => void`: Function to handle error messages.
- `darkMode?: boolean`: Optional. Enables dark mode styling when true.
- `onDateSelect: (date: Date, timing?: string) => void`: Callback function when a date (and optionally a time) is selected.
- `reservationDates?: ReservationDate[]`: Optional. Array of available reservation dates with their respective time slots.
- `customProceedFunction?: () => void`: Optional. Custom function to execute when proceeding with the reservation.
- `formFillData?: FormData[]`: Optional. Array of form fields to display for additional information.
- `onFormFillAction?: (formData: { [key: string]: string }) => {}`: Optional. Function to execute when the form is submitted.

## Interfaces

### ReservationDate

```typescript
interface ReservationDate {
  date: Date;
  numSlots: number;
  timings?: string[];
}
```

### FormData

```typescript
interface FormData {
  name: string;
  labelName: string;
  placeholder: string;
}
```

## Features

1. **Calendar Display**: Shows a monthly calendar with navigation controls.
2. **Date Selection**: Allows users to select available dates.
3. **Time Slot Selection**: If available, displays time slots for selected dates.
4. **Dark Mode**: Supports a dark color scheme for better visibility in low-light environments.
5. **Form Integration**: Can display a customizable form for additional information gathering.
6. **Responsive Design**: Adapts to different screen sizes for optimal user experience.

## Usage

To use the SimpleReservationCalendar component:

1. Import the component into your React application.
2. Provide the required props, including validation function, error handling, and date selection callback.
3. Optionally provide reservation dates, custom proceed function, or form data as needed.

## Basic Usage

Here's a basic example of how to use the SimpleReservationCalendar component:

```jsx
import React from "react";
import { SimpleReservationCalendar } from "gott-calendar-ui";

function App() {
  const handleDateSelect = (date, timing) => {
    console.log("Selected date:", date, "Timing:", timing);
  };

  const handleError = (errorMessage) => {
    console.error("Reservation Error:", errorMessage);
  };

  return (
    <SimpleReservationCalendar
      validateDateFunction={(date) => date >= new Date()}
      onDateSelect={handleDateSelect}
      handleError={handleError}
      errorMessage="This date is not available for reservation."
      darkMode={false}
    />
  );
}

export default App;
```

## Advanced Usage with All Props

For a more comprehensive setup, you can utilize all available props:

```jsx
import React from "react";
import { SimpleReservationCalendar } from "gott-calendar-ui";
import { sampleReservationDates, sampleFormFields } from "./sampleData";

function AdvancedReservationApp() {
  const validateDate = (date) => {
    const today = new Date();
    return (
      date >= today &&
      date <=
        new Date(today.getFullYear(), today.getMonth() + 3, today.getDate())
    );
  };

  const handleDateSelect = (date, timing) => {
    console.log("Reservation selected for:", date, "at", timing);
  };

  const handleError = (errorMessage) => {
    alert(errorMessage);
  };

  const handleFormSubmit = (formData) => {
    console.log("Form submitted with data:", formData);
  };

  const customProceed = () => {
    console.log("Custom proceed action triggered");
  };

  return (
    <SimpleReservationCalendar
      validateDateFunction={validateDate}
      onDateSelect={handleDateSelect}
      handleError={handleError}
      errorMessage="Selected date is not available or out of range."
      darkMode={false}
      reservationDates={sampleReservationDates}
      formFillData={sampleFormFields}
      onFormFillAction={handleFormSubmit}
      customProceedFunction={customProceed}
    />
  );
}

export default AdvancedReservationApp;
```

## Customization

The component can be customized by:

- Providing custom validation logic
- Specifying available dates and time slots
- Implementing a custom proceed function
- Defining form fields for additional data collection
- Toggling dark mode

## Accessibility

The component includes basic accessibility features such as keyboard navigation and semantic HTML structure. However, additional testing and enhancements may be required for full accessibility compliance.

## Notes

- Ensure that all required props are provided to avoid runtime errors.
- The component relies on CSS classes defined in "output.css" for styling.
- Form submission and custom proceed functionality should be implemented in the parent component.

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
