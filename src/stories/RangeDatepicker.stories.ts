import type { Meta, StoryObj } from "@storybook/react";
import { RangeDatePicker } from "./RangeDatePicker";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta = {
  title: "Range Date Picker",
  component: RangeDatePicker,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof RangeDatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    validateDateFunction: (date: Date) => true,
    validateRange: (startDate: Date, endDate: Date) => startDate < endDate,
    onRangeSelect: (startDate: Date, endDate: Date) =>
      console.log("Selected range:", startDate, "to", endDate),
    handleError: (msg: string) => console.error("Error:", msg),
    errorMessage: "Invalid date selected",
    rangeInvalidErrorMessage: "Invalid date range",
    darkMode: false,
    placeholderStart: "Start date",
    placeholderEnd: "End date",
  },
};
