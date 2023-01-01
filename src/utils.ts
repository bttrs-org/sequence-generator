export function shuffleArray(array: string[]) {
    let currentIndex = array.length;
    let randomIndex: number;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}

export function base62(i: number, alphabet: string[], prefix?: string, minChars?: number): string {
    let c: string;
    if (i === 0) {
        c = alphabet[0];
    } else {
        let sb = '';
        while (i > 0) {
            const rem = i % alphabet.length;
            sb = alphabet[rem] + sb;
            i = Math.floor(i / alphabet.length);
        }

        c = sb;
    }

    if (prefix && minChars) {
        return c.padStart(minChars, prefix);
    } else {
        return c;
    }
}
