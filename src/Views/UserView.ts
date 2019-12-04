import { IUser, IStats } from '../types';

export default class UserView {
    private entryNode: HTMLElement;
    constructor(entryNode: HTMLElement) {
        this.entryNode = entryNode;
    }
    private display(user: IUser, stats: IStats, progression: any[]) {
        return this.entryNode.innerHTML = `
            <h3>${user.pseudo} ( ${user.id} )</h3>
            <ul>
                <li>
                    WPM :
                    <span>${stats.WPM}</span>
                </li>
                <li>
                    LPS :
                    <span>${stats.LPS}</span>
                </li>
                <li>
                    <i style="color:#23b923">${stats.words.success}</i>
                    &nbsp;/&nbsp;
                    <i style="color:#b92323">${stats.words.fail}</i>
                    ( ${Math.floor(stats.words.ratio * 100)}% )
                </li>
            </ul>
        `;
    }
}
