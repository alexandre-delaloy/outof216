"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClockController = /** @class */ (function () {
    function ClockController(model, view) {
        this.model = model;
        this.view = view;
    }
    ClockController.prototype.displayView = function () {
        return this.view.display(this.model.getSeconds());
    };
    ClockController.prototype.updateView = function () {
        return this.view.update(this.model.getSeconds());
    };
    return ClockController;
}());
exports.default = ClockController;
//# sourceMappingURL=ClockController.js.map