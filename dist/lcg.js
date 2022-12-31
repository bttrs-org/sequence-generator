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
    exports.createLcg = void 0;
    const primes = [13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
    /**
     * @param min min generated value (inclusive)
     * @param max max generated value (exclusive)
     * @param seed custom seed (for testing)
     */
    function createLcg(min, max, seed) {
        if (!Number.isInteger(min) || !Number.isInteger(max)) {
            throw new Error('min and max have to be integers.');
        }
        if (min < 0) {
            throw new Error('min has to be >= 0.');
        }
        if (!Number.isSafeInteger(max)) {
            throw new Error(`max has to be <= ${Number.MAX_SAFE_INTEGER}.`);
        }
        const modulus = max - min;
        const increment = getIncrement(modulus);
        const multiplier = getMultiplier(modulus);
        let value;
        if (typeof seed === 'number') {
            if (seed < modulus) {
                value = seed;
            }
            else {
                value = seed % modulus;
            }
        }
        else {
            value = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) % modulus;
        }
        function generator() {
            value = (multiplier * value + increment) % modulus;
            return value + min;
        }
        return Object.assign(generator, {
            get increment() {
                return increment;
            },
            get modulus() {
                return modulus;
            },
            get multiplier() {
                return multiplier;
            },
        });
    }
    exports.createLcg = createLcg;
    function getIncrement(num) {
        for (const prime of primes) {
            if (num % prime !== 0) {
                return prime;
            }
        }
        return primes[0];
    }
    function primeFactors(num) {
        const factors = [];
        let sqrt = Math.sqrt(num);
        for (let i = 3; i < sqrt; i++) {
            if (num % i === 0) {
                do {
                    num = Math.floor(num / i);
                } while (num % i === 0);
                sqrt = Math.sqrt(num);
                factors.push(i);
            }
        }
        if (num > 1) {
            factors.push(num);
        }
        return factors;
    }
    function getMultiplier(num) {
        let multiplier = 1;
        for (const factor of primeFactors(num)) {
            multiplier *= factor;
        }
        while (multiplier % 4 !== 0 && num % 4 === 0) {
            multiplier *= 2;
        }
        return multiplier + 1;
    }
});
