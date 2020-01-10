"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TypewriterView = /** @class */ (function () {
    function TypewriterView(entryNode) {
        this.entryNode = entryNode;
    }
    TypewriterView.prototype.display = function (words, isWordFinished, hasToBeCorrected) {
        return this.entryNode.innerHTML = "\n            <strong style=\"color:\n                " + (isWordFinished ? '#23b923' : '') + "\n                " + (hasToBeCorrected ? '#b92323' : '') + "\n            \">>&nbsp;</strong>" + words.map(function (word) {
            return "<span>" + word.join('') + "</span>";
        }).join('&nbsp;') + "\n        ";
    };
    return TypewriterView;
}());
exports.default = TypewriterView;
//# sourceMappingURL=TypewriterView.js.map