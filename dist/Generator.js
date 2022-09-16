"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Generator = void 0;
const lodash_1 = require("lodash");
const BASE_ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const ALPHABET_LENGTH = BASE_ALPHABET.length;
const MAX_LENGTH = 8;
function generateAlphabet(random) {
    const chars = BASE_ALPHABET.split('');
    if (random) {
        return (0, lodash_1.shuffle)(chars);
    }
    return chars;
}
class Generator {
    constructor(options) {
        this.options = Object.assign({
            minChars: 1,
            maxChars: MAX_LENGTH,
            shuffle: true,
        }, options);
        if (!this.options.minChars || this.options.minChars < 1 || this.options.minChars > MAX_LENGTH) {
            throw new Error(`minChars has to be between 1 and ${MAX_LENGTH}`);
        }
        if (!this.options.maxChars || this.options.maxChars < 1 || this.options.maxChars > MAX_LENGTH) {
            throw new Error(`maxChars has to be between 1 and ${MAX_LENGTH}`);
        }
        this.alphabet = generateAlphabet(!!this.options.shuffle);
        this.minIndex = (this.options.minChars === 1) ? 0 : Math.pow(ALPHABET_LENGTH, this.options.minChars - 1);
        this.maxIndex = Math.pow(ALPHABET_LENGTH, this.options.maxChars) - 1;
        this.index = this.minIndex;
    }
    get sequenceLength() {
        return this.maxIndex - this.minIndex + 1;
    }
    generate() {
        const id = this.encodeIndex(this.index);
        this.index++;
        if (this.index > this.maxIndex) {
            this.index = this.minIndex;
        }
        return id;
    }
    encodeIndex(index) {
        return this.base62(index, this.alphabet);
    }
    base62(i, alphabet) {
        let c;
        if (i === 0) {
            c = alphabet[0];
        }
        else {
            let sb = '';
            while (i > 0) {
                const rem = i % ALPHABET_LENGTH;
                sb = alphabet[rem] + sb;
                i = Math.floor(i / ALPHABET_LENGTH);
            }
            c = sb;
        }
        if (this.options?.prefix) {
            return c.padStart(this.options.maxChars || MAX_LENGTH, this.options.prefix);
        }
        else {
            return c;
        }
    }
}
exports.Generator = Generator;
