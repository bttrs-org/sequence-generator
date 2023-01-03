# Sequence ID Generator

A small library for generating base62 encoded sequence. It can be used to generate incremental sequence but also to generate random values.

Random values are generated with a Linear congruential generator - each value in the sequence is generated only once. After all possible values are generated, the sequence is repeated.

## Usage

### Default behavior

By default, base62 encoded values from an interval <0 Number.MAX_SAFE_INTEGER) are generated.

```js
const rnd = createGenerator();
for (let i = 0; i < 15; i++) {
    console.log(rnd());
}
// output: 0,1,2,3,4,5,6,7,8,9,a,b,c,d,e
```

### Custom alphabet

```js
const rnd = createGenerator({
    alphabet: '01234',
});
for (let i = 0; i < 10; i++) {
    console.log(rnd());
}
// output: 0,1,2,3,4,10,11,12,13,14
```

### Limit generated values

Setting min and max value.

```js
const rnd = createGenerator({
    alphabet: '01234',
    max: 4,
});
for (let i = 0; i < 10; i++) {
    console.log(rnd());
}
// output: 0,1,2,3,4,0,1,2,3,4
```

```js
const rnd = createGenerator({
    alphabet: '01234',
    min: 1
    max: 8,
});
for (let i = 0; i < 10; i++) {
    console.log(rnd());
}
// output: 1,2,3,4,10,11,12,13,1,2
```

Setting minLength and maxLength will calculate and override min and max options.

```js
const rnd = createGenerator({
    alphabet: '012',
    minLength: 2,
    maxLength: 3,
});
for (let i = 0; i < 10; i++) {
    console.log(rnd());
}
// output: 10,11,12,20,21,22,100,101,102,110
```

### Random values

Shuffle alphabet - value will be increased by 1 but output will be encoded with a shuffled alphabet.

```js
const rnd = createGenerator({
    alphabet: '01234',
    shuffle: true,
});
for (let i = 0; i < 10; i++) {
    console.log(rnd());
}
// output: 3,1,4,0,2,13,11,14,10,12
```

Random generator - each value from sequence is generated exactly once.

```js
const rnd = createGenerator({
    alphabet: '01234',
    max: 8,
    random: true,
});
for (let i = 0; i < 20; i++) {
    console.log(rnd());
}
// output: 12,2,11,1,10,0,4,13,3,12,2,11,1,10,0,4,13,3,12,2
```

### Fixed string length

```js
const rnd = createGenerator({
    alphabet: '01234',
    maxLength: 3,
    random: true,
    fixedLength: true,
});
for (let i = 0; i < 20; i++) {
    console.log(rnd());
}
// output: 102,200,223,031,414,132,030,403,011,144
```

## Options

| Name        | Description                                                                                        | Default                                                         |
| ----------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| min         | Inclusive minimum generated value. 0 <= min < Number.MAX_SAFE_INTEGER                              | 0                                                               |
| max         | Exclusive maximum generated value. min < max <= Number.MAX_SAFE_INTEGER                            | Number.MAX_SAFE_INTEGER                                         |
| minLength   | Minimal length of generated encoded string. If specified, min option is ignored.                   | 0                                                               |
| maxLength   | Maximal length of generated encoded string. If specified, max option is ignored.                   | 9                                                               |
| fixedLength | If enabled, all generated strings has the same length = maxLength.                                 | false                                                           |
| prefix      | Prefix used if fixedLength is enabled. Default value us first character from (shuffled) alphabet.  | '0'                                                             |
| shuffle     | If enabled, alphabet is shuffled.                                                                  | false                                                           |
| random      | If enabled, random values within range <min, max) will be generated instead of incremental values. | false                                                           |
| alphabet    | Custom alphabet used for encoding.                                                                 | '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ |

## API

### Object properties

-   options: get all used options including calculated ones.

```js
const rnd = createGenerator();
console.log(rnd.options);
// output:
// {
//     min: 0,
//     max: 9007199254740991,
//     minLength: 1,
//     maxLength: 9,
//     prefix: '0',
//     fixedLength: false,
//     random: false,
//     shuffle: false,
//     alphabet: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
// }
```
