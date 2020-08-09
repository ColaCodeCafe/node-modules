export interface IPasswordCheckerOptions {
    // all allowed non-alphanumeric symbols list
    allowedSymbols: string[];
    // range of allowed numbers, [start, end]
    numberRange: [string, string];
    // range of allowed lowercase letters, [start, end]
    letterRange: [string, string];
    // range of allowed capital letters, [start, end]
    LetterRange: [string, string];
    // range of the allowed password length, [min, max]
    lengthRange: [number, number];
    // maximum allowable length of the character repetition
    repetitionLength: number;
    // maximum allowable length of the consecution of the number characters
    numberConsecutionLength: number;
    // maximum allowable length of the consecution of the letters
    letterConsecutionLength: number;
}

export interface ILevelDetails {
     // is the password legal in characters set and length
     legal: boolean
     // the value of the length that out of the legal length
     // if the actual length is grater then the legal length, it will be a positive integer, which is the actual length subtracts the max vlaue of the legal length range,
     // or if the actual length is less then the legal length, it will be a negative integer, which is the actual length subtracts the min vlaue of the legal length range,
     // or it will be zero
     outOfLength: number
     // how many char types the password has?
     // there are four types in all,
     // they are numbers, lowercase letters, capital letters and other symbols
     charTypesCount?: number
     // if the password has one or more repetitions of same character
     hasRepetition?: boolean
     // if the password has one or more consecutions of the consecutive numbers or letters
     hasCharConsecution?: boolean
}