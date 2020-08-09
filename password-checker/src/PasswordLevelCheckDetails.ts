import { ILevelDetails } from "../types/helpers";

export class PasswordLevelCheckDetails implements ILevelDetails {
    legal: boolean = true
    outOfLength: number = 0
    charTypesCount?: number
    hasRepetition?: boolean
    hasCharConsecution?: boolean
}