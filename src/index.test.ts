import createGenerator, { Generator } from './index';

describe('generator', () => {
    test('default options are correctly created', () => {
        const gen = createGenerator();

        expect(gen.options).toEqual({
            alphabet: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
            fixedLength: false,
            max: 9007199254740991,
            maxLength: 9,
            min: 0,
            minLength: 1,
            prefix: '',
            random: false,
            shuffle: false,
        });
    });

    test('options - correct minLength and maxLength calculated', () => {
        let gen = createGenerator({
            alphabet: '01234',
            min: 0,
            max: 5,
        });
        expect(gen.options.minLength).toEqual(1);
        expect(gen.options.maxLength).toEqual(2);
        gen = createGenerator({
            alphabet: '01234',
            min: 4,
            max: 6,
        });
        expect(gen.options.minLength).toEqual(1);
        expect(gen.options.maxLength).toEqual(2);
        gen = createGenerator({
            alphabet: '01234',
            min: 24,
            max: 25,
        });
        expect(gen.options.minLength).toEqual(2);
        expect(gen.options.maxLength).toEqual(3);
    });

    test('options - correct min and max calculated', () => {
        let gen = createGenerator({
            alphabet: '01234',
            minLength: 1,
            maxLength: 1,
        });
        expect(gen.options.min).toEqual(0);
        expect(gen.options.max).toEqual(4);

        gen = createGenerator({
            alphabet: '01234',
            minLength: 2,
            maxLength: 2,
        });
        expect(gen.options.min).toEqual(5);
        expect(gen.options.max).toEqual(24);

        gen = createGenerator({
            alphabet: '01234',
            min: 0,
            max: 5,
            minLength: 2,
            maxLength: 3,
        });
        expect(gen.options.min).toEqual(5);
        expect(gen.options.max).toEqual(124);
    });

    test('generate values', () => {
        let gen: Generator;
        let values: string[];

        gen = createGenerator({
            alphabet: '01234',
        });
        values = [];
        for (let i = 0; i <= 15; i++) {
            values.push(gen());
        }
        expect(values).toEqual([
            '0',
            '1',
            '2',
            '3',
            '4',
            '10',
            '11',
            '12',
            '13',
            '14',
            '20',
            '21',
            '22',
            '23',
            '24',
            '30',
        ]);

        gen = createGenerator({
            alphabet: '01234',
            max: 5,
        });
        values = [];
        for (let i = 0; i <= 11; i++) {
            values.push(gen());
        }
        expect(values).toEqual(['0', '1', '2', '3', '4', '10', '0', '1', '2', '3', '4', '10']);
    });
});
