import { ReservationDate, FormData } from "../SimpleReservationCalendar";

// Sample Reservation dates
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
  {
    date: new Date(2024, 8, 25), // September 25, 2024
    numSlots: 1,
    timings: ["01:00 PM"],
  },
  {
    date: new Date(2024, 8, 28), // September 28, 2024
    numSlots: 3,
    timings: ["09:30 AM", "12:30 PM", "04:30 PM"],
  },
  {
    date: new Date(2024, 9, 1), // October 1, 2024
    numSlots: 2,
    timings: ["10:00 AM", "03:00 PM"],
  },
  {
    date: new Date(2024, 9, 3), // October 3, 2024
    numSlots: 3,
    timings: ["09:00 AM", "01:00 PM", "05:00 PM"],
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

export const sampleReservationDatesNoTimings: ReservationDate[] = [
  {
    date: new Date(2024, 8, 20), // September 20, 2024
    numSlots: 3,
  },
  {
    date: new Date(2024, 8, 21), // September 21, 2024
    numSlots: 2,
  },
  {
    date: new Date(2024, 8, 23), // September 23, 2024
    numSlots: 4,
  },
  {
    date: new Date(2024, 8, 25), // September 25, 2024
    numSlots: 1,
  },
  {
    date: new Date(2024, 8, 28), // September 28, 2024
    numSlots: 3,
  },
  {
    date: new Date(2024, 9, 1), // October 1, 2024
    numSlots: 2,
  },
  {
    date: new Date(2024, 9, 3), // October 3, 2024
    numSlots: 3,
  },
];
