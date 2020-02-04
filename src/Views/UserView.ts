import { IUser } from '../types';

const qs = (selector: any): any => document.querySelector(selector);

export default class UserView {
    private entryNode: HTMLElement;
    constructor(entryNode: HTMLElement) {
        this.entryNode = entryNode;
    }
    private setMessage(user: IUser) {
        const MESSAGES: Array<[number, string]> = [
            [ 0, 'Pity..' ],
            [ 20, 'Really..?' ],
            [ 30, 'Not bad.' ],
            [ 40, 'Great !'],
            [ 50, 'Unbelievable !!'],
            [ 60, 'Godlike !!!' ],
        ];
        let message: string;

        MESSAGES.forEach(el => {
            if (user.WPM >= el[0]) {
                message = el[1];
            }
        });
        return message;
    }
    private display(
        user: IUser,
        isPopin: boolean,
    ) {
        this.entryNode.innerHTML = `
            ${isPopin ? `
                <div id="overlay" class="overlay"></div>
                <div id="content">
                    <h3>${this.setMessage(user)}</h3>
                    <ul>
                        <li>
                            <strong>${user.WPM}</strong>
                            <span>Words Per Minute</span>
                        </li>
                        <li>
                            <strong>${user.LPS.average}</strong>
                            <span>Letters Per Second</span>
                        </li>
                        <li>
                            <strong>${Math.floor(user.words.ratio * 100)}%</strong>
                            <span>of Accuracy  (<i style="color:#23b923">${user.words.success}</i>
                            /
                            <i style="color:#b92323">${user.words.fail}</i>)
                        </li>
                    </ul>
                    <form>
                        <label>
                            Enter your pseudo:
                            <input
                                type="text"
                                placehoder="John Doe"
                                maxLength="12"
                                minLength="2"
                            />
                        </label>
                        <input type="submit" value="Submit score"/>
                    </form>
                    or
                    <a href="">Retry</a>
                </div>
            ` : ''}
        `;
        if (isPopin) {
            setTimeout(() => {
                qs('#popin').className = 'active';
                const input: HTMLInputElement = qs('input[type="text"]');
                input.focus();
            }, 500);
        }
    }
    private destroy() {
        if (qs('#popin')) {
            qs('#popin').className = '';
        }
        this.entryNode.innerHTML = '';
        return location.reload();
    }
}
