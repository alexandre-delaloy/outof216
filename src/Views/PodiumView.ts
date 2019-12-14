import { IUser } from '../types';

export default class PodiumView {
    private entryNode: HTMLElement;
    constructor(entryNode: HTMLElement) {
        this.entryNode = entryNode;
    }
    private display(users: IUser[]) {
        this.entryNode.innerHTML = `
            <strong>Podium: </strong>
            ${users.map((user: IUser, i: number) => {
                while (i < 5) {
                    return `<li>
                        ${i + 1}.
                        ${user.name} -
                        ${user.WPM} WPM -
                        Acc: ${Math.floor(user.words.ratio * 100)}%
                    </li>`;
                }
            }).join('')}
        `;
    }
}
