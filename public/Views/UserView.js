"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var qs = function (selector) { return document.querySelector(selector); };
var UserView = /** @class */ (function () {
    function UserView(entryNode) {
        this.entryNode = entryNode;
    }
    UserView.prototype.setMessage = function (user) {
        var MESSAGES = [
            [0, 'Pity..'],
            [20, 'Not bad.'],
            [40, 'Great !'],
            [50, 'Unbelievable !!'],
            [60, 'Godlike !!!'],
        ];
        var message;
        MESSAGES.forEach(function (el) {
            if (user.WPM >= el[0]) {
                message = el[1];
            }
        });
        return message;
    };
    UserView.prototype.display = function (user, isPopin) {
        this.entryNode.innerHTML = "\n            " + (isPopin ? "\n                <div id=\"overlay\" class=\"overlay\"></div>\n                <div id=\"content\">\n                    <h3>" + this.setMessage(user) + "</h3>\n                    <ul>\n                        <li>\n                            WPM:\n                            <span>" + user.WPM + "</span>\n                        </li>\n                        <li>\n                            <i style=\"color:#23b923\">" + user.words.success + "</i>\n                            &nbsp;/&nbsp;\n                            <i style=\"color:#b92323\">" + user.words.fail + "</i>\n                            ( " + Math.floor(user.words.ratio * 100) + "% )\n                        </li>\n                    </ul>\n                    <form>\n                        <label>\n                            Enter your pseudo:\n                            <input\n                                type=\"text\"\n                                placehoder=\"John Doe\"\n                                maxLength=\"12\"\n                                minLength=\"2\"\n                            />\n                        </label>\n                        <input type=\"submit\" value=\"Submit score\"/>\n                    </form>\n                    or\n                    <a href=\"\">Retry</a>\n                </div>\n            " : '') + "\n        ";
        if (isPopin) {
            setTimeout(function () {
                qs('#popin').className = 'active';
                var input = qs('input[type="text"]');
                input.focus();
            }, 500);
        }
    };
    UserView.prototype.destroy = function () {
        if (qs('#popin')) {
            qs('#popin').className = '';
        }
        this.entryNode.innerHTML = '';
        // return location.reload();
    };
    return UserView;
}());
exports.default = UserView;
//# sourceMappingURL=UserView.js.map