export default class TypewriterView {
    private entryNode: HTMLElement;
    constructor(entryNode: HTMLElement) {
        this.entryNode = entryNode;
    }
    private display(words: string[][]) {
        return this.entryNode.innerHTML = `
            <div>${words.map((word: string[]) => {
                return word.join('');
            }).join('&nbsp;')}
             </div>
        `;
    }
}
