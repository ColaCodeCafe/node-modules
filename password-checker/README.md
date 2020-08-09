# CodeCafe Password Checker

> A class that can be instantiated as a password checker by pass some check options in, and we can use this checker to check our password, or rate it.

## Installing

For the latest stable version:

Using npm:

```sh
npm install --save @codecafe/password-checker
```

or simply using this:
```sh
npm i @codecafe/password-checker
```

or using yarn:

```sh
yarn add @codecafe/password-checker
```

## Instantiation

To use password checker, you need to import `@codecafe/password-checker` to your project first, and then instantiated it with the options parameter.

For example:

```js
import PasswordChecker from '@codecafe/password-checker';

const pwc = new PasswordChecker({
    allowedSymbols: ['_', '-', '!', '@', '#', '$', '%', '^', '&', '*', '?'],
    lengthRange: [8, 18],
    letterRange: ['a', 'z'],
    LetterRange: ['A', 'Z'],
    numberRange: ['0', '9'],
    repetitionLength: 3,
    numberConsecutionLength: 3,
    letterConsecutionLength: 4,
});
```

we call the options parameter interface `IPasswordCheckerOptions`:

```ts
interface IPasswordCheckerOptions {
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
    // maximum allowable length of the character repetition(not include the max value)
    repetitionLength: number;
    // maximum allowable length of the consecution of the number characters(not include the max value)
    numberConsecutionLength: number;
    // maximum allowable length of the consecution of the letters(not include the max value)
    letterConsecutionLength: number;
}
```

we supported an instantiated implementation of this interface as the default options object:

```ts
const defaultPasswordCheckerOptions: IPasswordCheckerOptions = {
    allowedSymbols: ['_', '-', '!', '@', '#', '$', '%', '^', '&', '*', '?'],
    lengthRange: [8, 18],
    letterRange: ['a', 'z'],
    LetterRange: ['A', 'Z'],
    numberRange: ['0', '9'],
    repetitionLength: 3,
    numberConsecutionLength: 3,
    letterConsecutionLength: 4,
}
```

so that you can just pass in the modified part of all the properties of this interface,
or even pass none:

```js
const pwc = new PasswordChecker({
    allowedSymbols: ['_', '-', '!', '@', '#', '$', '%', '^', '&', '*', '?'],
    lengthRange: [8, 18],
});
```

```js
const pwc = new PasswordChecker();
```

we will fill the rest properties from the object `defaultPasswordCheckerOptions` in.

After the object has been instantiated, we could get the regular of this checker:

```ts
class PasswordChecker {
    // the regular for checking the characters set and length
    charsAndLengthPattern: RegExp

    // the regulars for checking charecter types
    classifiedCharsPatterns: RegExp[]

    ...
}
```

this two properties are readonly, you can not change it after the object has been instantiated.

## Checking your password

There are 4 check methods to check your password, they are:

`checkLength`, which can check whether your password length is out of the legal length, and return the length of out part:

```ts
checkLength(password: string): number;
```

`checkCharsSetAndLength`, which is used to check whether the characters set and length of your password are all legal:

```ts
checkCharsSetAndLength(password: string): boolean;
```

`checkRepetition`, which to be used in checking if there are one or more repetitions of same character in your password:

```ts
checkRepetition(password: string): boolean;
```

`checkCharConsecution`, which to be used in checking if there are one or more consecutions of the consecutive numbers or letters in your password:

```ts
checkCharConsecution(password: string): boolean;
```

## Rating youe password

You can use the `getLevel` method to get the level of your password:

```ts
getLevel(password: string): number
```

for example:
```js
const level = pwc.getLevel('aabbcc1122!!CCBBAA');

console.log(level) // print 4
```

## Rating details

You must be wondering why your password get such a rate level, everyone has such a doubt, and we got it.
We designed a class `PasswordLevelCheckDetails` to show you the level details of your password.
you can't instantiated it by self, but you can get the instance of it after each time you called the getLevel method,
here is the codes:

```js
const level = pwc.getLevel('aabbcc1122!!CCBBAA', details);
const details = pwc.lastLevelDetails;

console.log(details)
/*
print PasswordLevelCheckDetails {
    legal: true,
    outOfLength: 0,
    charTypesCount: 4,
    hasRepetition: false,
    hasCharConsecution: false,
}
*/
```

class `PasswordLevelCheckDetails` is a implementation of interface `ILevelDetails`:
```ts
interface ILevelDetails {
    // is the password legal in characters set and length
    legal: boolean
    // the length of out part
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
```