import { escapeSymbols, fillCharTweens, createCharRange, createRepetition, createConsecution } from "./helpers"
import { IPasswordCheckerOptions } from "../types/helpers"

export class PatternSet extends Array<RegExp> {
    options: IPasswordCheckerOptions
    lengthRange: [number, number]
    repetitionList: string[] = []
    consecutionList: string[] = []

    constructor(options: IPasswordCheckerOptions) {
        super()

        const symbols = options.allowedSymbols.map(escapeSymbols)
        const letters = fillCharTweens(options.letterRange[0], options.letterRange[1])
        const LETTERS = fillCharTweens(options.LetterRange[0], options.LetterRange[1])
        const numbers = fillCharTweens(options.numberRange[0], options.numberRange[1])

        const a2z = createCharRange(options.numberRange[0], options.numberRange[1])
        const A2Z = createCharRange(options.letterRange[0], options.letterRange[1])
        const o2n = createCharRange(options.LetterRange[0], options.LetterRange[1])

        this.lengthRange = options.lengthRange
        this[0] = new RegExp(`^[${a2z}${A2Z}${o2n}${symbols.join('')}]{${options.lengthRange.join(',')}}$`)
        this[1] = new RegExp('[' + symbols.join('') + ']')
        this[2] = new RegExp('[' + a2z + ']')
        this[3] = new RegExp('[' + A2Z + ']')
        this[4] = new RegExp('[' + o2n + ']')
        this.repetitionList = []
        this.consecutionList = []

        numbers.forEach((char, index, chars) => {
            this.repetitionList.push(createRepetition(char, options.repetitionLength))
            if (index < chars.length - options.numberConsecutionLength) {
                this.consecutionList.push(createConsecution(chars, index, options.numberConsecutionLength))
            }
        })

        letters.forEach((char, index, chars) => {
            this.repetitionList.push(createRepetition(char, options.repetitionLength))
            if (index < chars.length - options.letterConsecutionLength) {
                this.consecutionList.push(createConsecution(chars, index, options.letterConsecutionLength))
            }
        })

        LETTERS.forEach((char, index, chars) => {
            this.repetitionList.push(createRepetition(char, options.repetitionLength))
            if (index < chars.length - options.letterConsecutionLength) {
                this.consecutionList.push(createConsecution(chars, index, options.letterConsecutionLength))
            }
        })

        options.allowedSymbols.forEach((char) => {
            this.repetitionList.push(createRepetition(char, options.repetitionLength))
        })

        this.options = options
    }
}