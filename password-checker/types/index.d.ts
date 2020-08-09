import { IPasswordCheckerOptions, ILevelDetails } from "./helpers"

declare class PasswordChecker {
    charsAndLengthPattern: RegExp
    classifiedCharsPatterns: RegExp[]

    lastLevelDetails: ILevelDetails

    constructor(options?: IPasswordCheckerOptions | any);

    getLevel(password: string): number;

    checkLength(password: string): number;

    checkCharsSetAndLength(password: string): boolean;

    checkRepetition(password: string): boolean;

    checkCharConsecution(password: string): boolean;
}

export default PasswordChecker