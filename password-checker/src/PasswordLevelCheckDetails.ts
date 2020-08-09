import { ILevelDetails } from "password-checker/types/helpers";

export class PasswordLevelCheckDetails implements ILevelDetails {
    legal: boolean = true
    outOfLength: number = 0
    charTypesCount?: number
    hasRepetition?: boolean
    hasCharConsecution?: boolean
}