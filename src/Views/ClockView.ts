export default class ClockView {
    private entryNode: HTMLElement;
    constructor(entryNode: HTMLElement) {
        this.entryNode = entryNode;
    }
    private display(seconds: number) {
        this.entryNode.innerHTML = '';
        for (let i = 0; i < seconds; i++) {
            this.entryNode.innerHTML += '|';
        }
    }
    private update(seconds: number) {
        this.entryNode.innerHTML = '';
        for (let i = 0; i < seconds; i++) {
            this.entryNode.innerHTML += '|';
        }
    }
}
