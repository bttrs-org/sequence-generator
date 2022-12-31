(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./lcg", "./utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const lcg_1 = require("./lcg");
    const utils_1 = require("./utils");
    const DEFAULT_ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    function createGenerator(opts) {
        const options = getOptions(opts);
        const alphabet = options.alphabet.split('');
        const gen = getNumberGenerator(options.random, options.min, options.max);
        function generate() {
            return (0, utils_1.base62)(gen(), alphabet, options.prefix, options.maxLength);
        }
        return Object.assign(generate, {
            get options() {
                return { ...options };
            },
        });
    }
    exports.default = createGenerator;
    function getNumberGenerator(random, min, max) {
        if (random) {
            return (0, lcg_1.createLcg)(min, max + 1);
        }
        let index = min;
        return function () {
            const i = index;
            index++;
            if (index > max) {
                index = min;
            }
            return i;
        };
    }
    function getOptions(options) {
        const alphabet = getAlphabet(options?.alphabet ?? DEFAULT_ALPHABET, options?.shuffle);
        let min;
        let max;
        let minLength;
        let maxLength;
        if (options?.minLength !== undefined) {
            minLength = options.minLength;
            min = minLength === 1 ? 0 : alphabet.length ** (minLength - 1);
        }
        else {
            min = options?.min ?? 0;
            minLength = encodedLength(min, alphabet.length);
        }
        if (options?.maxLength !== undefined) {
            maxLength = options.maxLength;
            max = alphabet.length ** options.maxLength - 1;
        }
        else {
            max = options?.max ?? Number.MAX_SAFE_INTEGER;
            maxLength = encodedLength(max, alphabet.length);
        }
        if (min >= max) {
            throw new Error();
        }
        return {
            min,
            max,
            minLength,
            maxLength,
            prefix: options?.prefix ?? '',
            fixedLength: options?.fixedLength ?? false,
            random: options?.random ?? false,
            shuffle: options?.shuffle ?? false,
            alphabet,
        };
    }
    function encodedLength(n, alphabetLength) {
        if (n === 0) {
            return 1;
        }
        let l = 0;
        let b = 1;
        while (b <= n) {
            l++;
            b = b * alphabetLength;
        }
        return l;
    }
    function getAlphabet(alphabet, shuffle) {
        const chars = alphabet.split('');
        if (shuffle) {
            (0, utils_1.shuffleArray)(chars);
        }
        return chars.join('');
    }
});
