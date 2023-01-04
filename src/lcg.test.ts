import { createLcg } from './lcg';

describe('lcg', () => {
    test('generates full range from 0', () => {
        const range = 235236;
        const rnd = createLcg(0, range);
        const generated: number[] = [];
        const indexes: number[] = [];

        for (let index = 0; index < range; index++) {
            indexes.push(index);
            generated.push(rnd());
        }
        generated.sort((a, b) => a - b);
        expect(generated).toEqual(indexes);
    });

    test('generates full range', () => {
        const rnd = createLcg(10, 20);

        const generated: number[] = [];
        const indexes: number[] = [];

        for (let index = 10; index < 20; index++) {
            indexes.push(index);
            generated.push(rnd());
        }
        generated.sort((a, b) => a - b);
        expect(generated).toEqual(indexes);
    });

    test('generates same cycle', () => {
        const range = 235236;
        const rnd = createLcg(0, range);
        const firstCycle: number[] = [];
        const secondCycle: number[] = [];

        for (let index = 0; index < range; index++) {
            firstCycle.push(rnd());
        }
        for (let index = 0; index < range; index++) {
            secondCycle.push(rnd());
        }
        expect(firstCycle).toEqual(secondCycle);
    });

    test('multiplier is correct', () => {
        expect(createLcg(0, 853).multiplier).toEqual(854);
        expect(createLcg(0, 1000).multiplier).toEqual(41);
        expect(createLcg(0, 1000000).multiplier).toEqual(21);
        expect(createLcg(0, 235236).multiplier).toEqual(235237);
    });

    test('increment is correct', () => {
        expect(createLcg(0, 13 * 17).increment).toEqual(19);
        expect(createLcg(0, 5).increment).toEqual(13);
        expect(createLcg(0, 1000).increment).toEqual(13);
    });
});
