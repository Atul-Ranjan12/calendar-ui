import type { Meta, StoryObj } from "@storybook/react";
import { SimpleReservationCalendar } from "./SimpleReservationCalendar";
import {
  sampleReservationDates,
  sampleFormFields,
  sampleReservationDatesNoTimings,
} from "./samples/samples";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta = {
  title: "Simple Reservation Calendar",
  component: SimpleReservationCalendar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
    backgrounds: {
      default: "customBackground", // Set the default background
      values: [
        { name: "customBackground", value: "#fcd34d" }, // Custom background color
        { name: "white", value: "#ffffff" },
        { name: "dark", value: "#333333" },
      ],
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof SimpleReservationCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    validateDateFunction: (date: Date) => true,
    onDateSelect: (date: Date) => console.log("This date was picked: ", date),
    handleError: (msg: string) => console.log("An error occured: ", msg),
    darkMode: true,
    reservationDates: sampleReservationDates,
    errorMessage: "An Error occured",
    formFillData: sampleFormFields,
    onFormFillAction: (formData: { [key: string]: string }) => {
      console.log("This is formData: ", formData);
    },
  },
};
