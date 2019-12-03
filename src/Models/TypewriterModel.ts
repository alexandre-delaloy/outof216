export default class TypewriterModel {
    private words: string[][];
    private goodWordsCount: number;
    private badWordsCount: number;
    constructor(words: string[][]) {
        this.words = words;
        this.goodWordsCount = 0;
        this.badWordsCount = 0;
    }
    public getWords(): string[][] {
        return this.words;
    }
    public setWords(newWords: any) {
        this.words = newWords;
    }
    public getGoodWordsCount(): number {
        return this.goodWordsCount;
    }
    public setGoodWordsCount(newGoodWordsCount: number) {
        this.goodWordsCount = newGoodWordsCount;
    }
    public getBadWordsCount(): number {
        return this.badWordsCount;
    }
    public setBadWordsCount(newBadWordsCount: number) {
        this.badWordsCount = newBadWordsCount;
    }
}
