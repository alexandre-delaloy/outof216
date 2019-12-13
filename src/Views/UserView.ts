import { IUser } from '../types';

export default class UserView {
    private entryNode: HTMLElement;
    constructor(entryNode: HTMLElement) {
        this.entryNode = entryNode;
    }
    private display(
        user: IUser,
        isPopin: boolean,
        progression: any[],
    ) {
        let message: string;
        if (user.WPM <= 0) {
            message = 'pity..';
        } else if (user.WPM <= 20) {
            message = 'not bad';
        } else if (user.WPM <= 30) {
            message = 'Great !';
        } else if (user.WPM <= 60) {
            message = 'unbelievable !!';
        } else if (user.WPM <= 80) {
            message = 'godlike !!!';
        }
        if (isPopin) {
            document.querySelector('#popin').className = 'active';
        }
        return this.entryNode.innerHTML = `
            ${isPopin ? `
                <div id="overlay">
                <div class="content">
                    <h3>${message}</h3>
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
                            <input type="text" placehoder="John Doe"/>
                        </label>
                        <input type="submit" value="Submit score"/>
                    </div>
            ` : ''}
        `;
    }
    private destroy() {
        document.querySelector('#popin').className = '';
        this.entryNode.innerHTML = '';
        return window.location.href = '';
    }
}
