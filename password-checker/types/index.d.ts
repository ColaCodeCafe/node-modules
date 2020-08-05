import { IPasswordCheckerOptions, ILevelDetails } from "./helpers"

declare class PasswordChecker {
    lastLevelDetails: ILevelDetails
    charsAndLengthPattern: RegExp
    classifiedCharsPatterns: RegExp[]

    constructor(options?: IPasswordCheckerOptions | any);

    getLevel(password: string): number;

    checkLength(password: string): number;

    checkCharsSetAndLength(password: string): boolean;

    checkRepetition(password: string): boolean;

    checkCharConsecution(password: string): boolean;
}

export default PasswordChecker