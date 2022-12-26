(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.generateAlphabet = exports.base62 = void 0;
    function shuffleArray(array) {
        let currentIndex = array.length;
        let randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
    }
    function base62(i, alphabet, maxChars, prefix) {
        let c;
        if (i === 0) {
            c = alphabet[0];
        }
        else {
            let sb = '';
            while (i > 0) {
                const rem = i % alphabet.length;
                sb = alphabet[rem] + sb;
                i = Math.floor(i / alphabet.length);
            }
            c = sb;
        }
        if (prefix) {
            return c.padStart(maxChars, prefix);
        }
        else {
            return c;
        }
    }
    exports.base62 = base62;
    function generateAlphabet(alphabet, shuffle) {
        const chars = alphabet.split('');
        if (shuffle) {
            shuffleArray(chars);
        }
        return chars;
    }
    exports.generateAlphabet = generateAlphabet;
});
