"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordChecker = void 0;
var PatternSet_1 = require("./PatternSet");
var helpers_1 = require("./helpers");
var PasswordLevelCheckDetails_1 = require("./PasswordLevelCheckDetails");
var PasswordChecker = /** @class */ (function () {
    function PasswordChecker(options) {
        if (options === void 0) { options = null; }
        this.lastLevelDetails = null;
        options = Object.assign({}, helpers_1.defaultPasswordCheckerOptions, options || null);
        this.patters = new PatternSet_1.PatternSet(options);
    }
    Object.defineProperty(PasswordChecker.prototype, "charsAndLengthPattern", {
        get: function () {
            return this.patters[0];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PasswordChecker.prototype, "classifiedCharsPatterns", {
        get: function () {
            return this.patters.slice(1, 4);
        },
        enumerable: false,
        configurable: true
    });
    PasswordChecker.prototype.getLevel = function (password) {
        this.lastLevelDetails = new PasswordLevelCheckDetails_1.PasswordLevelCheckDetails;
        return helpers_1.getLevel(this.patters, password, this.lastLevelDetails);
    };
    PasswordChecker.prototype.checkLength = function (password) {
        return helpers_1.checkOutOfLength(this.patters, password);
    };
    PasswordChecker.prototype.checkCharsSetAndLength = function (password) {
        return helpers_1.checkCharsSetAndLength(this.patters, password);
    };
    PasswordChecker.prototype.checkRepetition = function (password) {
        return helpers_1.checkRepetition(this.patters, password);
    };
    PasswordChecker.prototype.checkCharConsecution = function (password) {
        return helpers_1.checkCharConsecution(this.patters, password);
    };
    return PasswordChecker;
}());
exports.PasswordChecker = PasswordChecker;
//# sourceMappingURL=PasswordChecker.js.map