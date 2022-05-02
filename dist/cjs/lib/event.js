"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEvent = void 0;
function addEvent(event, listener, options) {
    window.addEventListener(event, listener, options);
    return {
        remove: function () {
            window.removeEventListener(event, listener);
        },
    };
}
exports.addEvent = addEvent;
