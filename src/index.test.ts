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
            prefix: '0',
            random: false,
            shuffle: false,
        });
    });

    test('options - shuffled alphabet', () => {
        const gen = createGenerator({
            alphabet: '01234',
            shuffle: true,
        });
        expect(gen.options.alphabet).not.toBe('01234');
        expect(gen.options.alphabet.split('').sort().join('')).toBe('01234');
    });

    test('options - correct minLength and maxLength calculated', () => {
        let gen = createGenerator({
            alphabet: '01234',
            min: 0,
            max: 5,
        });
        expect(gen.options.minLength).toBe(1);
        expect(gen.options.maxLength).toBe(2);
        gen = createGenerator({
            alphabet: '01234',
            min: 4,
            max: 6,
        });
        expect(gen.options.minLength).toBe(1);
        expect(gen.options.maxLength).toBe(2);
        gen = createGenerator({
            alphabet: '01234',
            min: 24,
            max: 25,
        });
        expect(gen.options.minLength).toBe(2);
        expect(gen.options.maxLength).toBe(3);
    });

    test('options - correct min and max calculated', () => {
        let gen = createGenerator({
            alphabet: '01234',
            minLength: 1,
            maxLength: 1,
        });
        expect(gen.options.min).toBe(0);
        expect(gen.options.max).toBe(4);

        gen = createGenerator({
            alphabet: '01234',
            minLength: 2,
            maxLength: 2,
        });
        expect(gen.options.min).toBe(5);
        expect(gen.options.max).toBe(24);

        gen = createGenerator({
            alphabet: '01234',
            min: 0,
            max: 5,
            minLength: 2,
            maxLength: 3,
        });
        expect(gen.options.min).toBe(5);
        expect(gen.options.max).toBe(124);
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

    test('generate shuffled values', () => {
        let gen: Generator;
        let values: string[];

        gen = createGenerator({
            alphabet: '01234',
            shuffle: true,
            max: 4,
        });
        values = [];
        for (let i = 0; i < 5; i++) {
            values.push(gen());
        }
        expect(values).not.toEqual(['0', '1', '2', '3', '4']);
        expect(values.sort()).toEqual(['0', '1', '2', '3', '4']);
    });

    test('generate random values', () => {
        let gen: Generator;
        let values: string[];

        gen = createGenerator({
            alphabet: '01234',
            random: true,
            max: 10,
        });
        values = [];
        for (let i = 0; i < 12; i++) {
            values.push(gen());
        }
        expect(values).not.toEqual(['0', '1', '2', '3', '4', '10', '11', '12', '13', '14', '20', '0']);
        expect(values[0]).toBe(values[values.length - 1]);
    });

    test('generate values with prefix', () => {
        let gen: Generator;
        let values: string[];

        gen = createGenerator({
            alphabet: '01234',
            max: 10,
            fixedLength: true,
        });
        values = [];
        for (let i = 0; i < 12; i++) {
            values.push(gen());
        }
        expect(values).toEqual(['00', '01', '02', '03', '04', '10', '11', '12', '13', '14', '20', '00']);

        gen = createGenerator({
            alphabet: '01234',
            max: 10,
            fixedLength: true,
            prefix: '-',
        });
        values = [];
        for (let i = 0; i < 12; i++) {
            values.push(gen());
        }
        expect(values).toEqual(['-0', '-1', '-2', '-3', '-4', '10', '11', '12', '13', '14', '20', '-0']);
    });
});
