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
export default function createGenerator(opts?: Partial<GeneratorOptions>): Generator;
