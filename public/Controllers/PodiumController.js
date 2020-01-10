"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PodiumController = /** @class */ (function () {
    function PodiumController(model, view) {
        this.model = model;
        this.view = view;
    }
    PodiumController.prototype.displayView = function () {
        return this.view.display(this.model.getUsers());
    };
    PodiumController.prototype.updateView = function () {
        return this.view.update(this.model.getUsers());
    };
    return PodiumController;
}());
exports.default = PodiumController;
//# sourceMappingURL=PodiumController.js.map