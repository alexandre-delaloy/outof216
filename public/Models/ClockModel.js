"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClockModel = /** @class */ (function () {
    function ClockModel(seconds) {
        this.seconds = seconds;
    }
    ClockModel.prototype.getSeconds = function () {
        return this.seconds;
    };
    ClockModel.prototype.setSeconds = function (newSeconds) {
        this.seconds = newSeconds;
    };
    return ClockModel;
}());
exports.default = ClockModel;
//# sourceMappingURL=ClockModel.js.map