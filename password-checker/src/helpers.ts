import { PatternSet } from "./PatternSet"
import { IPasswordCheckerOptions, ILevelDetails } from "../types/helpers"
import { PasswordCheckResult } from "./PasswordCheckResult"

export const defaultPasswordCheckerOptions: IPasswordCheckerOptions = {
    allowedSymbols: ['_', '-', '!', '@', '#', '$', '%', '^', '&', '*', '?'],
    lengthRange: [8, 18],
    letterRange: ['a', 'z'],
    LetterRange: ['A', 'Z'],
    numberRange: ['0', '9'],
    repetitionLength: 3,
    numberConsecutionLength: 3,
    letterConsecutionLength: 4,
}

export function getLevel(patterns: PatternSet, password: string, details: ILevelDetails = null): number {
    details = details || new PasswordCheckResult
    details.legal = checkCharsSetAndLength(patterns, password)
    if (details.legal) {
        details.outOfLength = 0
        details.charTypesCount = [1, 2, 3, 4].filter(index => patterns[index].test(password)).length
        details.hasRepetition = checkRepetition(patterns, password)
        details.hasCharConsecution = checkCharConsecution(patterns, password)
        return details.charTypesCount - Number(details.hasRepetition || details.hasCharConsecution)
    }

    details.outOfLength = checkOutOfLength(patterns, password)
    delete details.charTypesCount
    delete details.hasRepetition
    delete details.hasCharConsecution

    return -1
}

export function checkCharsSetAndLength(patterns: PatternSet, password: string): boolean {
    return patterns[0].test(password)
}

export function checkOutOfLength(patterns: PatternSet, password: string): number {
    const length = password.length
    if (length < patterns.lengthRange[0]) return length - patterns.lengthRange[0]
    if (length > patterns.lengthRange[1]) return length - patterns.lengthRange[1]
    return 0
}

export function checkRepetition(patterns: PatternSet, password: string): boolean {
    for (let index = 0; index < patterns.repetitionList.length; index++) {
        const chars = patterns.repetitionList[index];
        if (password.indexOf(chars) > -1) {
            return true
        }
    }
    return false
}

export function checkCharConsecution(patterns: PatternSet, password: string): boolean {
    for (let index = 0; index < patterns.consecutionList.length; index++) {
        const chars = patterns.consecutionList[index];
        if (password.indexOf(chars) > -1) {
            return true
        }
    }
    return false
}

export function escapeSymbols(char: string): string {
    if (char === '-') {
        return '\\' + char
    }
    return char
}

export function fillCharTweens(start: string, end: string): string[] {
    let index = start.charCodeAt(0)
    let max = end.charCodeAt(0)
    const list = []
    for (; index <= max; index++) {
        list.push(String.fromCharCode(index))
    }
    return list
}

export function createCharRange(start: string, end: string): string {
    let min = start.charCodeAt(0)
    let max = end.charCodeAt(0)
    return `\\x${min.toString(16)}-\\x${max.toString(16)}`
}

export function createRepetition(char: string, times: number) {
    char = String(char)
    let repetition = char
    for (let index = 1; index < times; index++) {
        repetition += char
    }
    return repetition
}

export function createConsecution(chars: string[], start: number, step: number) {
    let max = (start + step < chars.length) ? (start + step) : chars.length
    let char = ''
    let consecution = ''
    for (let index = start; index < max; index++) {
        char = String(chars[index])
        consecution += char
    }
    return consecution
}