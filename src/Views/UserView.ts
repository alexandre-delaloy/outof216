export default class userView {
    private entryNode: HTMLElement;
    constructor(entryNode: HTMLElement) {
        this.entryNode = entryNode;
    }
    private displayPopin(words: string[][]) {
        return this.entryNode.innerHTML = `
            <div>${words.map((word: string[]) => {
                return `<span>${word.join('')}</span>`;
            }).join('&nbsp;')}
             </div>
        `;
    }
}
