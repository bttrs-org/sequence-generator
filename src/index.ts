import { createLcg } from './lcg';
import { base62, shuffleArray } from './utils';

export interface GeneratorOptions {
    /** Min generated value (inclusive). */
    min: number;
    /** Max generated value (inclusive). */
    max: number;
    /** Min length of generated string. */
    minLength: number;
    /** Max length of generated string. */
    maxLength: number;
    /** All generated strings will be prefixed and have maxLength length. */
    fixedLength: boolean;
    /** Prefix used if fixedLength in true. If not specified, first alphabet letter is used. */
    prefix: string;
    /** If true, alphabet will be shuffled. */
    shuffle: boolean;
    /**
     * If true, random values will be generated.
     * Each number between min and max will be generated exactly once.
     * After all possible values are generated, it repeats the same random sequence again.
     */
    random: boolean;
    /**
     * Custom alphabet.
     * Default is "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
     */
    alphabet: string;
}

export interface Generator {
    (options?: GeneratorOptions): string;
    readonly options: GeneratorOptions;
}

const DEFAULT_ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export default function createGenerator(opts?: Partial<GeneratorOptions>): Generator {
    const options: GeneratorOptions = getOptions(opts);
    const alphabet: string[] = options.alphabet.split('');

    const gen = getNumberGenerator(options.random, options.min, options.max);

    function generate(): string {
        const minChars = options.fixedLength ? options.maxLength : options.minLength;
        return base62(gen(), alphabet, options.prefix, minChars);
    }

    return Object.assign(generate, {
        get options(): GeneratorOptions {
            return { ...options };
        },
    });
}

function getNumberGenerator(random: boolean, min: number, max: number) {
    if (random) {
        return createLcg(min, max + 1);
    }

    let index: number = min;
    return function () {
        const i = index;
        index++;
        if (index > max) {
            index = min;
        }
        return i;
    };
}

function getOptions(options?: Partial<GeneratorOptions>): GeneratorOptions {
    const alphabet = getAlphabet(options?.alphabet ?? DEFAULT_ALPHABET, options?.shuffle);
    if (!alphabet.length) {
        throw new Error('Options Error: alphabet cannot be empty.');
    }

    let min: number;
    let max: number;
    let minLength: number;
    let maxLength: number;

    if (options?.minLength !== undefined) {
        if (options.minLength < 1) {
            throw new Error('Options Error: minLength has to be at least 1.');
        }
        minLength = options.minLength;
        min = decodedMinLength(options.minLength, alphabet.length);
    } else {
        min = options?.min ?? 0;
        minLength = encodedLength(min, alphabet.length);
    }
    if (options?.maxLength !== undefined) {
        if (options.maxLength < 1) {
            throw new Error('Options Error: maxLength has to be at least 1.');
        }
        maxLength = options.maxLength;
        max = decodedMaxLength(options.maxLength, alphabet.length);
    } else {
        max = options?.max ?? Number.MAX_SAFE_INTEGER;
        maxLength = encodedLength(max, alphabet.length);
    }

    if (min < 0) {
        throw new Error('Options Error: min has to be at least 0.');
    }
    if (!Number.isSafeInteger(min) || !Number.isSafeInteger(max)) {
        throw new Error('Options Error: min and max have to be safe integers.');
    }
    if (min >= max) {
        throw new Error('Options Error: min has to be lower than max.');
    }

    return {
        min,
        max,
        minLength,
        maxLength,
        prefix: options?.prefix || alphabet.charAt(0),
        fixedLength: options?.fixedLength ?? false,
        random: options?.random ?? false,
        shuffle: options?.shuffle ?? false,
        alphabet,
    };
}

function decodedMinLength(n: number, alphabetLength: number): number {
    if (n === 1) {
        return 0;
    }
    let min = 1;
    for (let i = 0; i < n - 1; i++) {
        min = min * alphabetLength;
        if (!Number.isSafeInteger(min) || min < 0) {
            return Number.MAX_SAFE_INTEGER - 1;
        }
    }
    return min;
}

function decodedMaxLength(n: number, alphabetLength: number): number {
    let max = 1;
    for (let i = 0; i < n; i++) {
        max = max * alphabetLength;
        if (!Number.isSafeInteger(max) || max < 0) {
            return Number.MAX_SAFE_INTEGER;
        }
    }
    return max - 1;
}

function encodedLength(n: number, alphabetLength: number) {
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

function getAlphabet(alphabet: string, shuffle: boolean | undefined): string {
    const chars = alphabet.split('');
    if (shuffle) {
        shuffleArray(chars);
    }
    return chars.join('');
}
