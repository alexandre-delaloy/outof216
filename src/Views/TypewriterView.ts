export default class TypewriterView {
    private entryNode: HTMLElement;
    constructor(entryNode: HTMLElement) {
        this.entryNode = entryNode;
    }
    private displayWords(words: string[][], goodWordsCount: number, badWordsCount: number) {
        return this.entryNode.innerHTML = `
            <div>
                ${words.map((word: string[]) => {
                    return `<span>${word.join('')}</span>`;
                }).join('&nbsp;')}
            </div>
            <span>
                <i style="color:lightgreen">${goodWordsCount}</i>
                &nbsp;/&nbsp;
                <i style="color:red">${badWordsCount}</i>
            </span>
        `;
    }
}
