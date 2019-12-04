export default class TypewriterView {
    private entryNode: HTMLElement;
    constructor(entryNode: HTMLElement) {
        this.entryNode = entryNode;
    }
    private display(words: string[][], goodWordsCount: number, badWordsCount: number) {
        return this.entryNode.innerHTML = `
            ${words.map((word: string[]) => {
                return `<span>${word.join('')}</span>`;
            }).join('&nbsp;')}
        `;
    }
}
