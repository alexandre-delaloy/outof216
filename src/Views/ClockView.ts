export default class ClockView {
    private entryNode: HTMLElement;
    constructor(entryNode: HTMLElement) {
        this.entryNode = entryNode;
    }
    private displayTimer(seconds: number) {
        this.entryNode.innerHTML = '';
        for (let i = 0; i < seconds; i++) {
            this.entryNode.innerHTML += '|';
        }
    }
    private displayClock(seconds: number) {
        this.entryNode.innerHTML = `<li class="second">${seconds}s</li>`;
    }
}
