export interface LcgGenerator {
    (): number;
    readonly increment: number;
    readonly modulus: number;
    readonly multiplier: number;
}
/**
 * @param min min generated value (inclusive)
 * @param max max generated value (exclusive)
 * @param seed custom seed (for testing)
 */
export declare function createLcg(min: number, max: number, seed?: number): LcgGenerator;
