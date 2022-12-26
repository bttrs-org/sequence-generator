import { base62, generateAlphabet } from './utils';

const BASE_ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const MAX_LENGTH = 8;
const DEFAULT_OPTIONS: GeneratorOptions = {
    minChars: 1,
    maxChars: MAX_LENGTH,
    shuffle: true,
    prefix: '',
};

export interface GeneratorOptions {
    minChars: number;
    maxChars: number;
    prefix: string;
    shuffle: boolean;
}

export interface Generator {
    (options?: GeneratorOptions): string;
    readonly alphabet: string;
    readonly minValue: number;
    readonly maxValue: number;
    readonly sequenceLength: number;
}

export default function createGenerator(opts?: Partial<GeneratorOptions>): Generator {
    const options: GeneratorOptions = Object.assign({}, DEFAULT_OPTIONS, opts);
    if (!options.minChars || options.minChars < 1 || options.minChars > MAX_LENGTH) {
        throw new Error(`minChars has to be between 1 and ${MAX_LENGTH}`);
    }
    if (!options.maxChars || options.maxChars < 1 || options.maxChars > MAX_LENGTH) {
        throw new Error(`maxChars has to be between 1 and ${MAX_LENGTH}`);
    }

    const alphabet: string[] = generateAlphabet(BASE_ALPHABET, !!options.shuffle);
    const minValue: number = options.minChars === 1 ? 0 : Math.pow(BASE_ALPHABET.length, options.minChars - 1);
    const maxValue: number = Math.pow(BASE_ALPHABET.length, options.maxChars) - 1;
    let index: number = minValue;

    function generate(): string {
        const id = base62(index, alphabet, options.maxChars, options.prefix);
        index++;
        if (index > maxValue) {
            index = minValue;
        }

        return id;
    }

    return Object.assign(generate, {
        get alphabet(): string {
            return alphabet.join();
        },
        get minValue(): number {
            return minValue;
        },
        get maxValue(): number {
            return maxValue;
        },
        get sequenceLength(): number {
            return maxValue - minValue + 1;
        },
    });
}
