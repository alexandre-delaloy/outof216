"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserController = /** @class */ (function () {
    function UserController(model, view) {
        this.model = model;
        this.view = view;
    }
    UserController.prototype.updateView = function () {
        this.view.display(this.model.getUser(), this.model.getIsPopin());
        return this.closePopin();
    };
    UserController.prototype.destroyView = function () {
        return this.view.destroy();
    };
    UserController.prototype.closePopin = function () {
        var _this = this;
        var $overlay = document.querySelector('#overlay');
        if ($overlay) {
            particlesJS.load('overlay', 'particles.json', function () {
                var $p2 = pJSDom[1].pJS.particles;
                $p2.color.value = '#ff9d00';
                $p2.line_linked.color = '#444';
                $p2.line_linked.opacity = 0.333;
                pJSDom[1].pJS.fn.particlesRefresh();
            });
            $overlay.addEventListener('click', function (e) {
                e.stopPropagation();
                _this.destroyView();
            });
        }
    };
    return UserController;
}());
exports.default = UserController;
//# sourceMappingURL=UserController.js.map