(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const utils_1 = require("./utils");
    const BASE_ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const MAX_LENGTH = 8;
    const DEFAULT_OPTIONS = {
        minChars: 1,
        maxChars: MAX_LENGTH,
        shuffle: true,
        prefix: '',
    };
    function createGenerator(opts) {
        const options = Object.assign({}, DEFAULT_OPTIONS, opts);
        if (!options.minChars || options.minChars < 1 || options.minChars > MAX_LENGTH) {
            throw new Error(`minChars has to be between 1 and ${MAX_LENGTH}`);
        }
        if (!options.maxChars || options.maxChars < 1 || options.maxChars > MAX_LENGTH) {
            throw new Error(`maxChars has to be between 1 and ${MAX_LENGTH}`);
        }
        const alphabet = (0, utils_1.generateAlphabet)(BASE_ALPHABET, !!options.shuffle);
        const minValue = options.minChars === 1 ? 0 : Math.pow(BASE_ALPHABET.length, options.minChars - 1);
        const maxValue = Math.pow(BASE_ALPHABET.length, options.maxChars) - 1;
        let index = minValue;
        function generate() {
            const id = (0, utils_1.base62)(index, alphabet, options.maxChars, options.prefix);
            index++;
            if (index > maxValue) {
                index = minValue;
            }
            return id;
        }
        return Object.assign(generate, {
            get alphabet() {
                return alphabet.join();
            },
            get minValue() {
                return minValue;
            },
            get maxValue() {
                return maxValue;
            },
            get sequenceLength() {
                return maxValue - minValue + 1;
            },
        });
    }
    exports.default = createGenerator;
});
