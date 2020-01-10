"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChartController = /** @class */ (function () {
    function ChartController(model, view, isTest) {
        this.model = model;
        this.view = view;
    }
    ChartController.prototype.displayView = function () {
        return this.view.display(this.model.getUser(), this.model.getRecordOfWpm());
    };
    ChartController.prototype.updateView = function () {
        return this.view.update(this.model.getUser(), this.model.getRecordOfWpm());
    };
    return ChartController;
}());
exports.default = ChartController;
//# sourceMappingURL=ChartsController.js.map