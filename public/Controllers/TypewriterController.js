"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var UserModel_1 = __importDefault(require("../Models/UserModel"));
var UserView_1 = __importDefault(require("../Views/UserView"));
var UserController_1 = __importDefault(require("../Controllers/UserController"));
var ClockModel_1 = __importDefault(require("../Models/ClockModel"));
var ClockView_1 = __importDefault(require("../Views/ClockView"));
var ClockController_1 = __importDefault(require("../Controllers/ClockController"));
var utils_1 = require("../utils");
var qs = function (selector) { return document.querySelector(selector); };
var TypewriterController = /** @class */ (function () {
    function TypewriterController(model, view, setNewUser) {
        this.model = model;
        this.view = view;
        this.setNewUser = setNewUser;
        this.seconds = 60;
        this.mode = 'production';
        this.isWordFinished = false;
        this.hasToBeCorrected = false;
        this.isWordSkipped = false;
        this.isFinished = false;
        this.userM = new UserModel_1.default(utils_1.FAKE_USER, false);
        this.userV = new UserView_1.default(qs('#user'));
        this.userC = new UserController_1.default(this.userM, this.userV);
        this.clockM = new ClockModel_1.default(this.seconds);
        this.clockV = new ClockView_1.default(qs('#timer'));
        this.clockC = new ClockController_1.default(this.clockM, this.clockV);
    }
    /**
     * @returns check if test mode is enabled, then update the User & Clock view, then create a new Typewriter view
     */
    TypewriterController.prototype.updateView = function () {
        this.setTestMode();
        this.userC.updateView();
        this.clockC.displayView();
        return this.view.display(this.model.getWords(), this.isWordFinished, this.hasToBeCorrected);
    };
    TypewriterController.prototype.handleKeys = function () {
        var _this = this;
        var isStarted = false;
        var i = 0;
        // chC.updateView();
        var isFirstLetter = false;
        return window.addEventListener('keydown', function (e) {
            if (/[a-z]/g.test(e.key) ||
                e.code === 'Enter' ||
                e.code === 'Space' ||
                e.code === 'Backspace') {
                if (e.key === _this.model.getWords()[0][0]) {
                    isFirstLetter = true;
                }
                if (isFirstLetter) {
                    if (!_this.isFinished) {
                        qs('#tw').classList.add('started');
                        _this.isWordSkipped = false;
                        var USER = _this.userM.getUser();
                        if (!isStarted) {
                            _this.setTimer();
                            isStarted = true;
                        }
                        if (e.key === _this.model.getWords()[0][i]) {
                            _this.stylizeLetter('right', i);
                            i++;
                            if (i === _this.model.getWords()[0].length) {
                                _this.isWordFinished = true;
                            }
                        }
                        else {
                            if (e.code === 'Space' || e.code === 'Enter') {
                                USER.words.count++;
                                if (_this.isWordFinished) {
                                    _this.removeFirstWord();
                                    USER.words.success++;
                                    USER.WPM++;
                                    _this.userM.setUser(USER);
                                    utils_1.chartsC.updateView();
                                }
                                else {
                                    _this.removeFirstWord();
                                    USER.words.fail++;
                                    _this.userM.setUser(USER);
                                    _this.isWordSkipped = true;
                                    utils_1.chartsC.updateView();
                                }
                                USER.words.ratio = USER.words.success / USER.words.count;
                                _this.isWordFinished = false;
                                _this.hasToBeCorrected = false;
                                i = 0;
                            }
                            else if (e.code === 'Backspace') {
                                if (!_this.isWordFinished &&
                                    _this.hasToBeCorrected &&
                                    !_this.isWordSkipped) {
                                    _this.stylizeLetter('correct', i);
                                    _this.hasToBeCorrected = false;
                                }
                            }
                            else {
                                if (!_this.isWordFinished) {
                                    _this.stylizeLetter('wrong', i);
                                    _this.hasToBeCorrected = true;
                                }
                            }
                        }
                        _this.updateView();
                    }
                }
            }
        });
    };
    /**
     * @param type - the type of letter output (right | wrong | correct)
     * @param i : the index of the letter ( 0, 1, 2, n)
     *
     * @returns a stylization of the letter depending to the letter output
     */
    TypewriterController.prototype.stylizeLetter = function (type, i) {
        switch (type) {
            case 'right':
                return this.model.getWords()[0][i] = "<i style=\"color:#23b923;\">" + this.model.getWords()[0][i] + "</i>";
            case 'wrong':
                return this.model.getWords()[0][i] = "<i style=\"color:#b92323;\">" + this.model.getWords()[0][i] + "</i>";
            case 'correct':
                return this.model.getWords()[0][i] = this.model.getWords()[0][i]
                    .match(/>[a-z]/g)
                    .join()
                    .replace('>', '');
        }
        return this.model.setWords(this.model.getWords());
    };
    /**
     * @returns the list of word without the successed / skipped word
     */
    TypewriterController.prototype.removeFirstWord = function () {
        this.model.getWords().shift();
        this.model.setWords(this.model.getWords());
    };
    /**
     * @param formNode - the HTML form node
     *
     * @returns a user pushed in firebase
     */
    TypewriterController.prototype.handleSubmission = function (formNode) {
        var _this = this;
        formNode.addEventListener('submit', function (e) {
            e.preventDefault();
            var USER = _this.userM.getUser();
            var userInput = formNode.querySelector('input[type="text"]');
            USER.name = userInput.value;
            _this.userM.setUser(USER);
            if (_this.mode !== 'test') {
                _this.setNewUser(_this.userM.getUser());
            }
            return new UserController_1.default(_this.userM, new UserView_1.default(qs('#popin'))).destroyView();
        });
    };
    TypewriterController.prototype.setTimer = function () {
        var _this = this;
        var timer = setInterval(function () {
            _this.seconds--;
            _this.clockM.setSeconds(_this.seconds);
            _this.clockC.updateView();
            if (_this.seconds <= 10) {
                qs('#tw').classList.add('hurry');
            }
            if (_this.seconds <= 0) {
                clearInterval(timer);
                _this.userM.setIsPopin(true);
                new UserController_1.default(_this.userM, new UserView_1.default(qs('#popin'))).updateView();
                _this.userM.setIsPopin(false);
                _this.handleSubmission(qs('form'));
                _this.isFinished = true;
            }
        }, 1000);
    };
    TypewriterController.prototype.setTestMode = function () {
        if (window.location.hash.substr(1) === 'test') {
            this.mode = 'test';
            this.seconds = 2;
            this.clockM.setSeconds(this.seconds);
            this.clockC.updateView();
        }
    };
    return TypewriterController;
}());
exports.default = TypewriterController;
//# sourceMappingURL=TypewriterController.js.map