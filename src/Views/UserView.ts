import { IUser } from '../types';

export default class UserView {
    private entryNode: HTMLElement;
    constructor(entryNode: HTMLElement) {
        this.entryNode = entryNode;
    }
    private display(
        user: IUser,
        progression: any[],
    ) {
        return this.entryNode.innerHTML = `
            <ul>
                <li>
                    WPM:
                    <span>${user.WPM}</span>
                </li>
                <li>
                    <i style="color:#23b923">${user.words.success}</i>
                    &nbsp;/&nbsp;
                    <i style="color:#b92323">${user.words.fail}</i>
                    ( ${Math.floor(user.words.ratio * 100)}% )
                </li>
            </ul>
        `;
    }
}
