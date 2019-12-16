import { IUser } from '../types';

const qs = (selector: any): any => document.querySelector(selector);

export default class UserView {
    private entryNode: HTMLElement;
    constructor(entryNode: HTMLElement) {
        this.entryNode = entryNode;
    }
    private setMessage(user: IUser) {
        let message: string;
        if (user.WPM <= 0) {
            message = 'pity..';
        } else if (user.WPM <= 20) {
            message = 'not bad';
        } else if (user.WPM <= 40) {
            message = 'great !';
        } else if (user.WPM <= 60) {
            message = 'unbelievable !!';
        } else if (user.WPM <= 80) {
            message = 'godlike !!!';
        }
        return message;
    }
    private display(
        user: IUser,
        isPopin: boolean,
        progression: any[],
    ) {
        this.entryNode.innerHTML = `
            ${isPopin ? `
                <div id="overlay" class="overlay"></div>
                <div id="content">
                    <h3>${this.setMessage(user)}</h3>
            ` : ''}
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
            ${isPopin ? `
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
        qs('#popin').className = '';
        this.entryNode.innerHTML = '';
        return location.reload();
    }
}
