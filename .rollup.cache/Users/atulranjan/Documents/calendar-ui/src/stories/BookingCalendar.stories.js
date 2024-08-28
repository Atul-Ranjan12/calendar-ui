import { BookingCalendar } from "./BookingCalendar";
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
var meta = {
    title: "Calendar",
    component: BookingCalendar,
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
};
export default meta;
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export var Primary = {
    args: {
        name: "Reservation Calendar",
        reservationDayName: "Consultation day",
        setDateUserFormData: function (date) { },
        wrongDateErrorMessage: "Date unavailable, please click another",
        errorToast: function (msg) { },
    },
};
//# sourceMappingURL=BookingCalendar.stories.js.map