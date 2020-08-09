"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConsecution = exports.createRepetition = exports.createCharRange = exports.fillCharTweens = exports.escapeSymbols = exports.checkCharConsecution = exports.checkRepetition = exports.checkOutOfLength = exports.checkCharsSetAndLength = exports.getLevel = exports.defaultPasswordCheckerOptions = void 0;
var PasswordLevelCheckDetails_1 = require("./PasswordLevelCheckDetails");
exports.defaultPasswordCheckerOptions = {
    allowedSymbols: ['_', '-', '!', '@', '#', '$', '%', '^', '&', '*', '?'],
    lengthRange: [8, 18],
    letterRange: ['a', 'z'],
    LetterRange: ['A', 'Z'],
    numberRange: ['0', '9'],
    repetitionLength: 3,
    numberConsecutionLength: 3,
    letterConsecutionLength: 4,
};
function getLevel(patterns, password, details) {
    if (details === void 0) { details = null; }
    details = details || new PasswordLevelCheckDetails_1.PasswordLevelCheckDetails;
    details.legal = checkCharsSetAndLength(patterns, password);
    if (details.legal) {
        details.outOfLength = 0;
        details.charTypesCount = [1, 2, 3, 4].filter(function (index) { return patterns[index].test(password); }).length;
        details.hasRepetition = checkRepetition(patterns, password);
        details.hasCharConsecution = checkCharConsecution(patterns, password);
        return details.charTypesCount - Number(details.hasRepetition || details.hasCharConsecution);
    }
    details.outOfLength = checkOutOfLength(patterns, password);
    delete details.charTypesCount;
    delete details.hasRepetition;
    delete details.hasCharConsecution;
    return -1;
}
exports.getLevel = getLevel;
function checkCharsSetAndLength(patterns, password) {
    return patterns[0].test(password);
}
exports.checkCharsSetAndLength = checkCharsSetAndLength;
function checkOutOfLength(patterns, password) {
    var length = password.length;
    if (length < patterns.lengthRange[0])
        return length - patterns.lengthRange[0];
    if (length > patterns.lengthRange[1])
        return length - patterns.lengthRange[1];
    return 0;
}
exports.checkOutOfLength = checkOutOfLength;
function checkRepetition(patterns, password) {
    for (var index = 0; index < patterns.repetitionList.length; index++) {
        var chars = patterns.repetitionList[index];
        if (password.indexOf(chars) > -1) {
            return true;
        }
    }
    return false;
}
exports.checkRepetition = checkRepetition;
function checkCharConsecution(patterns, password) {
    for (var index = 0; index < patterns.consecutionList.length; index++) {
        var chars = patterns.consecutionList[index];
        if (password.indexOf(chars) > -1) {
            return true;
        }
    }
    return false;
}
exports.checkCharConsecution = checkCharConsecution;
function escapeSymbols(char) {
    if (char === '-') {
        return '\\' + char;
    }
    return char;
}
exports.escapeSymbols = escapeSymbols;
function fillCharTweens(start, end) {
    var index = start.charCodeAt(0);
    var max = end.charCodeAt(0);
    var list = [];
    for (; index <= max; index++) {
        list.push(String.fromCharCode(index));
    }
    return list;
}
exports.fillCharTweens = fillCharTweens;
function createCharRange(start, end) {
    var min = start.charCodeAt(0);
    var max = end.charCodeAt(0);
    return "\\x" + min.toString(16) + "-\\x" + max.toString(16);
}
exports.createCharRange = createCharRange;
function createRepetition(char, times) {
    char = String(char);
    var repetition = char;
    for (var index = 1; index < times; index++) {
        repetition += char;
    }
    return repetition;
}
exports.createRepetition = createRepetition;
function createConsecution(chars, start, step) {
    var max = (start + step < chars.length) ? (start + step) : chars.length;
    var char = '';
    var consecution = '';
    for (var index = start; index < max; index++) {
        char = String(chars[index]);
        consecution += char;
    }
    return consecution;
}
exports.createConsecution = createConsecution;
//# sourceMappingURL=helpers.js.map