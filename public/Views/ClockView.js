"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClockView = /** @class */ (function () {
    function ClockView(entryNode) {
        this.entryNode = entryNode;
    }
    ClockView.prototype.display = function (seconds) {
        this.entryNode.innerHTML = '';
        for (var i = 0; i < seconds; i++) {
            this.entryNode.innerHTML += '|';
        }
    };
    ClockView.prototype.update = function (seconds) {
        this.entryNode.innerHTML = '';
        for (var i = 0; i < seconds; i++) {
            this.entryNode.innerHTML += '|';
        }
    };
    return ClockView;
}());
exports.default = ClockView;
//# sourceMappingURL=ClockView.js.map