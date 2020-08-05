export interface IPasswordCheckerOptions {
    allowedSymbols: string[];
    numberRange: [string, string];
    letterRange: [string, string];
    LetterRange: [string, string];
    lengthRange: [number, number];
    repetitionLength: number;
    numberConsecutionLength: number;
    letterConsecutionLength: number;
}

export interface ILevelDetails {
    legal: boolean
    outOfLength: number
    charTypesCount?: number
    hasRepetition?: boolean
    hasCharConsecution?: boolean
}