"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PodiumModel = /** @class */ (function () {
    function PodiumModel(users) {
        this.users = users;
    }
    PodiumModel.prototype.getUsers = function () {
        return this.users;
    };
    PodiumModel.prototype.setUsers = function (newUsers) {
        this.users = newUsers;
    };
    return PodiumModel;
}());
exports.default = PodiumModel;
//# sourceMappingURL=PodiumModel.js.map