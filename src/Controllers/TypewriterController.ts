import UserModel from '../Models/UserModel';
import UserView from '../Views/UserView';
import UserController from '../Controllers/UserController';

import ClockModel from '../Models/ClockModel';
import ClockView from '../Views/ClockView';
import ClockController from '../Controllers/ClockController';

import { FAKE_USER, chartsC } from '../utils';
import { IUser } from '../types';

const qs = (selector: any): any => document.querySelector(selector);

export default class TypewriterController {
    private model: any;
    private view: any;
    private setNewUser: any;
    private seconds: number;
    private mode: string;
    private isWordFinished: boolean;
    private hasToBeCorrected: boolean;
    private isWordSkipped: boolean;
    private isFinished: boolean;
    private userM: UserModel;
    private userV: UserView;
    private userC: UserController;
    private clockM: ClockModel;
    private clockV: ClockView;
    private clockC: ClockController;
    constructor(model: any, view: any, setNewUser: any) {
        this.model = model;
        this.view = view;
        this.setNewUser = setNewUser;
        this.seconds = 60;
        this.mode = 'production';
        this.isWordFinished = false;
        this.hasToBeCorrected = false;
        this.isWordSkipped = false;
        this.isFinished = false;
        this.userM = new UserModel(FAKE_USER, false);
        this.userV = new UserView(qs('#user'));
        this.userC = new UserController(this.userM, this.userV);
        this.clockM = new ClockModel(this.seconds);
        this.clockV = new ClockView(qs('#timer'));
        this.clockC = new ClockController(this.clockM, this.clockV);
    }
    /**
     * @returns check if test mode is enabled, then update the User & Clock view, then create a new Typewriter view
     */
    public updateView() {
        this.setTestMode();
        this.userC.updateView();
        this.clockC.displayView();
        return this.view.display(
            this.model.getWords(),
            this.isWordFinished,
            this.hasToBeCorrected,
        );
    }
    public handleKeys() {
        let i: number = 0;
        const KEYSTROKES: number[] = [];
        let keystroke: number = 0;
        let isStarted: boolean = false;
        let isFirstLetter: boolean = false;

        return window.addEventListener('keydown', e => {
            if (
                /[a-z]/g.test(e.key) ||
                e.code === 'Enter' ||
                e.code === 'Space' ||
                e.code === 'Backspace'
            ) {
                if (e.key === this.model.getWords()[0][0]) {
                    isFirstLetter = true;
                }
                if (isFirstLetter) {

                    if (!this.isFinished) {
                        qs('#tw').classList.add('started');
                        this.isWordSkipped = false;
                        const USER = this.userM.getUser();
                        if (!isStarted) {
                            let j: number = 1;
                            let k: number = 0;
                            const calculateKeyStroke = setInterval(() => {
                                j++;
                                let total: number = 0;
                                KEYSTROKES.forEach(key => {
                                    total += key;
                                });
                                const AVERAGE = Math.round((total / KEYSTROKES.length + Number.EPSILON) * 100) / 100

                                ;
                                KEYSTROKES.push(keystroke);
                                USER.LPS.average = AVERAGE;
                                if (j % 10 === 0) {
                                    USER.LPS.all[k] = AVERAGE;
                                    k++;
                                }
                                chartsC.lpsUpdateView();
                                keystroke = 0;
                            }, 1000);
                            this.setTimer(calculateKeyStroke);
                            isStarted = true;
                        }
                        if (e.key === this.model.getWords()[0][i]) {
                            this.stylizeLetter('right', i);
                            i++;
                            keystroke++;
                            if (i === this.model.getWords()[0].length) {
                                this.isWordFinished = true;
                            }
                        } else {
                            if (e.code === 'Space' || e.code === 'Enter') {
                                USER.words.count++;
                                if (this.isWordFinished) {
                                    this.removeFirstWord();
                                    USER.words.success++;
                                    USER.WPM++;
                                    this.userM.setUser(USER);
                                    chartsC.updateView();
                                } else {
                                    this.removeFirstWord();
                                    USER.words.fail++;
                                    this.userM.setUser(USER);
                                    this.isWordSkipped = true;
                                    chartsC.updateView();
                                }
                                // tslint:disable-next-line: max-line-length
                                USER.words.ratio = Math.round((USER.words.success / USER.words.count + Number.EPSILON) * 100) / 100;
                                this.isWordFinished = false;
                                this.hasToBeCorrected = false;
                                i = 0;
                            } else if (e.code === 'Backspace') {
                                if (
                                    !this.isWordFinished &&
                                    this.hasToBeCorrected &&
                                    !this.isWordSkipped
                                ) {
                                    this.stylizeLetter('correct', i);
                                    this.hasToBeCorrected = false;
                                }
                            } else {
                                if (!this.isWordFinished) {
                                    this.stylizeLetter('wrong', i);
                                    this.hasToBeCorrected = true;
                                }
                            }
                        }
                        this.updateView();
                    }
                }
            }
        });
    }
    /**
     * @param type - the type of letter output (right | wrong | correct)
     * @param i : the k of the letter ( 0, 1, 2, n)
     *
     * @returns a stylization of the letter depending to the letter output
     */
    private stylizeLetter(type: string, i: number) {
        switch (type) {
            case 'right':
                return this.model.getWords()[0][i] = `<i style="color:#23b923;">${this.model.getWords()[0][i]}</i>`;
            case 'wrong':
                return this.model.getWords()[0][i] = `<i style="color:#b92323;">${this.model.getWords()[0][i]}</i>`;
            case 'correct':
                return this.model.getWords()[0][i] = this.model.getWords()[0][i]
                    .match(/>[a-z]/g)
                    .join()
                    .replace('>', '');
        }
        return this.model.setWords(this.model.getWords());
    }
    /**
     * @returns the list of word without the successed / skipped word
     */
    private removeFirstWord() {
        this.model.getWords().shift();
        this.model.setWords(this.model.getWords());
    }
    /**
     * @param formNode - the HTML form node
     *
     * @returns a user pushed in firebase
     */
    private handleSubmission(formNode: HTMLElement) {
        formNode.addEventListener('submit', e => {
            e.preventDefault();
            const USER = this.userM.getUser();
            const userInput: HTMLInputElement = formNode.querySelector('input[type="text"]');
            USER.name = userInput.value;
            this.userM.setUser(USER);
            if (this.mode !== 'test') {
                this.setNewUser(this.userM.getUser());
            }
            return new UserController(
                this.userM,
                new UserView(qs('#popin')),
            ).destroyView();
        });
    }
    private setTimer(calculateKeyStroke: any) {
        const timer = setInterval(() => {
            this.seconds--;
            this.clockM.setSeconds(this.seconds);
            this.clockC.updateView();
            if (this.seconds <= 10) {
                qs('#tw').classList.add('hurry');
            }
            if (this.seconds <= 0) {
                clearInterval(timer);
                clearInterval(calculateKeyStroke);
                this.userM.setIsPopin(true);
                new UserController(
                    this.userM,
                    new UserView(qs('#popin')),
                ).updateView();
                this.userM.setIsPopin(false);
                this.handleSubmission(qs('form'));
                this.isFinished = true;
            }
        }, 1000);
    }
    private setTestMode() {
        if (window.location.hash.substr(1) === 'test') {
            this.mode = 'test';
            this.seconds = 2;
            this.clockM.setSeconds(this.seconds);
            this.clockC.updateView();
        }
    }
    private calculateLps(j: number, k: number, KEYSTROKES: number[], keystroke: number, USER: IUser) {
        j++;
        let total: number = 0;
        KEYSTROKES.forEach(key => {
            total += key;
        });
        const AVERAGE = Math.round((total / KEYSTROKES.length + Number.EPSILON) * 100) / 100;
        KEYSTROKES.push(keystroke);
        USER.LPS.average = AVERAGE;
        if (j % 10 === 0) {
            USER.LPS.all[k] = AVERAGE;
            k++;
        }
        chartsC.lpsUpdateView();
        keystroke = 0;
    }
}
