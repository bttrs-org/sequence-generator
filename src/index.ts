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
        return base62(gen(), alphabet, options.prefix, options.maxLength);
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
    let min: number;
    let max: number;
    let minLength: number;
    let maxLength: number;

    if (options?.minLength !== undefined) {
        minLength = options.minLength;
        min = minLength === 1 ? 0 : alphabet.length ** (minLength - 1);
    } else {
        min = options?.min ?? 0;
        minLength = encodedLength(min, alphabet.length);
    }
    if (options?.maxLength !== undefined) {
        maxLength = options.maxLength;
        max = alphabet.length ** options.maxLength - 1;
    } else {
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
