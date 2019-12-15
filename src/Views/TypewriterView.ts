export default class TypewriterView {
    private entryNode: HTMLElement;
    constructor(entryNode: HTMLElement) {
        this.entryNode = entryNode;
    }
    private display(
        words: string[][],
        isWordFinished: boolean,
        hasToBeCorrected: boolean,
    ) {
        return this.entryNode.innerHTML = `
            <strong style="color:
                ${isWordFinished ? '#23b923' : ''}
                ${hasToBeCorrected ? '#b92323' : ''}
            ">
                >&nbsp;
            </strong>
            ${words.map((word: string[]) => {
                return `<span>${word.join('')}</span>`;
            }).join('&nbsp;')}
        `;
    }
}
