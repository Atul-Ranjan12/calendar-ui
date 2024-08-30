# Gott-Calendar-UI

A simple and elegant booking calendar to get things done simply for
React. This library along with this component will feature many other
calendar features that can be easily integrated into your react-app.
(coming soon in the next versions).

The calendar is easy to use, intuitive, and good looking for
integrations

<img width="793" alt="Screen Shot 2024-08-29 at 02 39 31" src="https://github.com/user-attachments/assets/c2133b01-91e5-4002-89be-1713d66cfeab">

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

Props
-----

The `Calendar` component accepts the following props:

### `validateDateFunction`

-   **Type:** `(date: Date) => boolean`
-   **Description:** A function that validates if a given date is selectable. It should return `true` if the date is valid, and `false` otherwise.
-   **Required:** Yes

### `errorMessage`

-   **Type:** `string`
-   **Description:** The error message displayed when an invalid date is selected.
-   **Required:** Yes

### `handleError`

-   **Type:** `(msg: string) => void`
-   **Description:** A function that handles displaying error messages. It receives the `errorMessage` string when an invalid date is clicked.
-   **Required:** Yes

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
