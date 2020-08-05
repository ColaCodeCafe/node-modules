import { PatternSet } from "./PatternSet";
import { getLevel, checkOutOfLength, checkCharsSetAndLength, checkRepetition, checkCharConsecution, defaultPasswordCheckerOptions } from "./helpers";
import { PasswordCheckResult } from "./PasswordCheckResult";
import { IPasswordCheckerOptions, ILevelDetails } from "../types/helpers";

export class PasswordChecker {
    private patters: PatternSet
    public lastLevelDetails: ILevelDetails = null

    constructor(options: IPasswordCheckerOptions = null) {
        options = Object.assign({}, defaultPasswordCheckerOptions, options || null)
        this.patters = new PatternSet(options)
    }

    get charsAndLengthPattern() {
        return this.patters[0]
    }

    get classifiedCharsPatterns() {
        return this.patters.slice(1, 4)
    }

    getLevel(password: string): number {
        this.lastLevelDetails = new PasswordCheckResult
        return getLevel(this.patters, password, this.lastLevelDetails)
    }

    checkLength(password: string): number {
        return checkOutOfLength(this.patters, password)
    }

    checkCharsSetAndLength(password: string): boolean {
        return checkCharsSetAndLength(this.patters, password)
    }

    checkRepetition(password: string): boolean {
        return checkRepetition(this.patters, password)
    }

    checkCharConsecution(password: string): boolean {
        return checkCharConsecution(this.patters, password)
    }
}