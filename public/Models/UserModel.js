"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserModel = /** @class */ (function () {
    function UserModel(user, isPopin) {
        this.user = user;
        this.isPopin = isPopin;
    }
    UserModel.prototype.getUser = function () {
        return this.user;
    };
    UserModel.prototype.setUser = function (newUser) {
        this.user = newUser;
    };
    UserModel.prototype.getIsPopin = function () {
        return this.isPopin;
    };
    UserModel.prototype.setIsPopin = function (newIsPopin) {
        this.isPopin = newIsPopin;
    };
    return UserModel;
}());
exports.default = UserModel;
//# sourceMappingURL=UserModel.js.map