export default class TypewriterModel {
    private words: string[][];
    constructor(words: string[][]) {
        this.words = words;
    }
    public getWords(): string[][] {
        return this.words;
    }
    public setWords(newWords: any) {
        this.words = newWords;
    }
}
