export default class TypewriterView {
    private entryNode: HTMLElement;
    constructor(entryNode: HTMLElement) {
        this.entryNode = entryNode;
    }
    // private displayLetters(letters: string[]) {

    // }
    private displayWords(words: string[][]) {
        return this.entryNode.innerHTML = `
            <div>${words.map((word: string[]) => {
                return `<span>${word.join('')}</span>`;
            }).join('&nbsp;')}
             </div>
        `;
    }
}
