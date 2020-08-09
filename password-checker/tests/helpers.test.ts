import { expect, test } from '@jest/globals';
import { PatternSet } from '../src/PatternSet';
import { getLevel, defaultPasswordCheckerOptions } from '../src/helpers';
import { IPasswordCheckerOptions, ILevelDetails } from '../types/helpers';
import { PasswordLevelCheckDetails } from '../src/PasswordLevelCheckDetails';

test('helpers.PatternSet test', () => {
    const patters = new PatternSet({
        ...defaultPasswordCheckerOptions,
        allowedSymbols: ['!', ':'],
        repetitionLength: 4,
        numberConsecutionLength: 5,
        letterConsecutionLength: 5
    } as IPasswordCheckerOptions)
    console.log(patters)

    expect(getLevel(patters, 'abcdefg')).toBe(-1)
    expect(getLevel(patters, '12345678')).toBe(0)
    expect(getLevel(patters, 'abc123')).toBe(-1)
    expect(getLevel(patters, 'aabbcc1122!!CCBBAA')).toBe(4)
    expect(getLevel(patters, 'aabbcc1122@@CCBBAA')).toBe(-1)
    expect(getLevel(patters, 'aabbcc112233!!CCBBAA:')).toBe(-1)
})

test('helpers.PatternSet Level Details test', () => {
    const patters = new PatternSet(defaultPasswordCheckerOptions)

    const details_1: ILevelDetails = new PasswordLevelCheckDetails
    const level_1 = getLevel(patters, 'abcdefg', details_1)
    expect(level_1).toBe(-1)
    expect(details_1.outOfLength).toBe(-1)

    const details_2: ILevelDetails = new PasswordLevelCheckDetails
    const level_2 = getLevel(patters, '12345678', details_2)
    expect(level_2).toBe(0)
    expect(details_2.hasCharConsecution).toBe(true)

    const details_3: ILevelDetails = new PasswordLevelCheckDetails
    const level_3 = getLevel(patters, 'abc123', details_3)
    expect(level_3).toBe(-1)
    expect(details_3.outOfLength).toBe(-2)
    expect(details_3.hasCharConsecution).toBe(undefined)

    const details_4: ILevelDetails = new PasswordLevelCheckDetails
    const level_4 = getLevel(patters, 'aabbcc1122!!CCBBAA', details_4)
    expect(level_4).toBe(4)

    const details_5: ILevelDetails = new PasswordLevelCheckDetails
    const level_5 = getLevel(patters, 'aabbcc112233!!CCBBAA:', details_5)
    expect(level_5).toBe(-1)
    expect(details_5.outOfLength).toBe(3)

    const details_6: ILevelDetails = new PasswordLevelCheckDetails
    const level_6 = getLevel(patters, 'aabbcc112233!!CCBB   ', details_6)
    expect(level_6).toBe(-1)
    expect(details_6.outOfLength).toBe(3)

    const details_7: ILevelDetails = new PasswordLevelCheckDetails
    const level_7 = getLevel(patters, 'aabbcc1122!!CCCBBB', details_7)
    expect(level_7).toBe(3)
    expect(details_7.hasRepetition).toBe(true)
})