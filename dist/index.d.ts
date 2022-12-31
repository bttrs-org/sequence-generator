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
export default function createGenerator(opts?: Partial<GeneratorOptions>): Generator;
