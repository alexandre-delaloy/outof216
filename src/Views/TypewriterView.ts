export default class TypewriterView {
    private entryNode: HTMLElement;
    constructor(entryNode: HTMLElement) {
        this.entryNode = entryNode;
    }
    private display(words: string[][], isWordFinished: boolean) {
        return this.entryNode.innerHTML = `
            <strong style="color:${isWordFinished ? '#23b923' : ''}">>&nbsp;</strong>${words.map((word: string[]) => {
                return `<span>${word.join('')}</span>`;
            }).join('&nbsp;')}
        `;
    }
}
