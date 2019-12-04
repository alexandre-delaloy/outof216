export default class TypewriterView {
    private entryNode: HTMLElement;
    constructor(entryNode: HTMLElement) {
        this.entryNode = entryNode;
    }
    private display(words: string[][]) {
        return this.entryNode.innerHTML = `
            <strong>>&nbsp;</strong>${words.map((word: string[]) => {
                return `<span>${word.join('')}</span>`;
            }).join('&nbsp;')}
        `;
    }
}
