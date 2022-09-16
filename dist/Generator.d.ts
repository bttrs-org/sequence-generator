export interface GeneratorOptions {
    minChars?: number;
    maxChars?: number;
    prefix?: string;
    shuffle?: boolean;
}
export declare class Generator {
    private readonly options;
    private readonly alphabet;
    private readonly minIndex;
    private readonly maxIndex;
    private index;
    constructor(options?: GeneratorOptions);
    get sequenceLength(): number;
    generate(): string;
    private encodeIndex;
    private base62;
}
