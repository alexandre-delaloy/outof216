"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChartsModel = /** @class */ (function () {
    function ChartsModel(user, recordofWpm) {
        this.user = user;
        this.recordOfWpm = recordofWpm;
    }
    ChartsModel.prototype.getUser = function () {
        return this.user;
    };
    ChartsModel.prototype.setUser = function (newUser) {
        this.user = newUser;
    };
    ChartsModel.prototype.getRecordOfWpm = function () {
        return this.recordOfWpm;
    };
    ChartsModel.prototype.setRecordOfWpm = function (newRecordOfWpm) {
        this.recordOfWpm = newRecordOfWpm;
    };
    return ChartsModel;
}());
exports.default = ChartsModel;
//# sourceMappingURL=ChartsModel.js.map