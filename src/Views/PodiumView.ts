import { IUser } from '../types';

export default class PodiumView {
    private entryNode: HTMLElement;
    constructor(entryNode: HTMLElement) {
        this.entryNode = entryNode;
    }
    private display(users: IUser[]) {
        this.entryNode.innerHTML = `
            ${users.map((user: IUser) => {
                return `<li>${user.name} - ${user.WPM}</li>`;
            })}
        `;
    }
}
