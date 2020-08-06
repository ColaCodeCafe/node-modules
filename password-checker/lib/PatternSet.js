"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatternSet = void 0;
var helpers_1 = require("./helpers");
var PatternSet = /** @class */ (function (_super) {
    __extends(PatternSet, _super);
    function PatternSet(options) {
        var _this = _super.call(this) || this;
        _this.repetitionList = [];
        _this.consecutionList = [];
        var symbols = options.allowedSymbols.map(helpers_1.escapeSymbols);
        var letters = helpers_1.fillCharTweens(options.letterRange[0], options.letterRange[1]);
        var LETTERS = helpers_1.fillCharTweens(options.LetterRange[0], options.LetterRange[1]);
        var numbers = helpers_1.fillCharTweens(options.numberRange[0], options.numberRange[1]);
        var a2z = helpers_1.createCharRange(options.numberRange[0], options.numberRange[1]);
        var A2Z = helpers_1.createCharRange(options.letterRange[0], options.letterRange[1]);
        var o2n = helpers_1.createCharRange(options.LetterRange[0], options.LetterRange[1]);
        _this.lengthRange = options.lengthRange;
        _this[0] = new RegExp("^[" + a2z + A2Z + o2n + symbols.join('') + "]{" + options.lengthRange.join(',') + "}$");
        _this[1] = new RegExp('[' + symbols.join('') + ']');
        _this[2] = new RegExp('[' + a2z + ']');
        _this[3] = new RegExp('[' + A2Z + ']');
        _this[4] = new RegExp('[' + o2n + ']');
        _this.repetitionList = [];
        _this.consecutionList = [];
        numbers.forEach(function (char, index, chars) {
            _this.repetitionList.push(helpers_1.createRepetition(char, options.repetitionLength));
            if (index <= chars.length - options.numberConsecutionLength) {
                _this.consecutionList.push(helpers_1.createConsecution(chars, index, options.numberConsecutionLength));
            }
        });
        letters.forEach(function (char, index, chars) {
            _this.repetitionList.push(helpers_1.createRepetition(char, options.repetitionLength));
            if (index <= chars.length - options.letterConsecutionLength) {
                _this.consecutionList.push(helpers_1.createConsecution(chars, index, options.letterConsecutionLength));
            }
        });
        LETTERS.forEach(function (char, index, chars) {
            _this.repetitionList.push(helpers_1.createRepetition(char, options.repetitionLength));
            if (index <= chars.length - options.letterConsecutionLength) {
                _this.consecutionList.push(helpers_1.createConsecution(chars, index, options.letterConsecutionLength));
            }
        });
        options.allowedSymbols.forEach(function (char) {
            _this.repetitionList.push(helpers_1.createRepetition(char, options.repetitionLength));
        });
        _this.options = options;
        return _this;
    }
    return PatternSet;
}(Array));
exports.PatternSet = PatternSet;
//# sourceMappingURL=PatternSet.js.map