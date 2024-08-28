import { __awaiter, __generator } from "tslib";
import { within, userEvent, expect } from '@storybook/test';
import { Page } from './Page';
var meta = {
    title: 'Example/Page',
    component: Page,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
};
export default meta;
export var LoggedOut = {};
// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export var LoggedIn = {
    play: function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
        var canvas, loginButton, logoutButton;
        var canvasElement = _b.canvasElement;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    canvas = within(canvasElement);
                    loginButton = canvas.getByRole('button', { name: /Log in/i });
                    return [4 /*yield*/, expect(loginButton).toBeInTheDocument()];
                case 1:
                    _c.sent();
                    return [4 /*yield*/, userEvent.click(loginButton)];
                case 2:
                    _c.sent();
                    return [4 /*yield*/, expect(loginButton).not.toBeInTheDocument()];
                case 3:
                    _c.sent();
                    logoutButton = canvas.getByRole('button', { name: /Log out/i });
                    return [4 /*yield*/, expect(logoutButton).toBeInTheDocument()];
                case 4:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    }); },
};
//# sourceMappingURL=Page.stories.js.map