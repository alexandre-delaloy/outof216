import UserModel from '../Models/UserModel';
import UserView from '../Views/UserView';
import UserController from '../Controllers/UserController';
import ph from '../placeholders';

export default class TypewriterController {
    private model: any;
    private view: any;
    private userM: any;
    private userV: any;
    private userC: any;
    constructor(model: any, view: any) {
        this.model = model;
        this.view = view;
        this.userM = new UserModel(ph.user, ph.stats, []);
        this.userV = new UserView(document.querySelector('#user'));
        this.userC = new UserController(this.userM, this.userV);
    }
    public updateView() {
        this.userC.updateView();
        return this.view.display(
            this.model.getWords(),
            this.model.getGoodWordsCount(),
            this.model.getBadWordsCount(),
        );
    }
    public handleKeys() {
        let isWordFinished: boolean = false;
        let hasToBeCorrected: boolean = false;
        let i: number = 0;
        return window.addEventListener('keydown', (e) => {
            const stats = this.userM.getStats();

            if (e.key === this.model.getWords()[0][i]) {
                this.stylizeLetter('right', i);
                i++;
                if (i === this.model.getWords()[0].length) {
                    console.log('🔷 - finished');
                    stats.WPM++;
                    this.userM.setStats(stats);
                    isWordFinished = true;
                }
            } else {
                if (e.code === 'Space') {
                    stats.words.count++;
                    stats.words.ratio = stats.words.success / stats.words.count;
                    if (isWordFinished) {
                        console.log('🔵 - word validated');
                        this.removeFirstWord();
                        stats.words.success++;
                        this.userM.setStats(stats);
                    } else {
                        console.log('🚫 - word skipped');
                        this.removeFirstWord();
                        stats.words.fail++;
                        this.userM.setStats(stats);
                    }
                    isWordFinished = false;
                    i = 0;
                } else if (e.code === 'Backspace') {
                    if (!isWordFinished && hasToBeCorrected) {
                        this.letterCorrection(i);
                        hasToBeCorrected = false;
                    }
                } else {
                    if (!isWordFinished) {
                        this.stylizeLetter('wrong', i);
                        hasToBeCorrected = true;
                    }
                }
            }
            this.updateView();
        });
    }
    private stylizeLetter(type: string, i: number) {
        switch (type) {
            case 'right':
                console.log('✅ - right letter');
                return this.model.getWords()[0][i] = `<i style="color:lightgreen;">${this.model.getWords()[0][i]}</i>`;
            case 'wrong':
                console.log('❌ - wrong letter');
                return this.model.getWords()[0][i] = `<i style="color:red;">${this.model.getWords()[0][i]}</i>`;
            case 'correct':
                console.log('🔶 - corrected letter');
                return this.model.getWords()[0][i] = this.model.getWords()[0][i]
                    .match(/>[a-z]/g)
                    .join()
                    .replace('>', '');
        }
        return this.model.setWords(this.model.getWords());
    }
    private removeFirstWord() {
        this.model.getWords().shift();
        this.model.setWords(this.model.getWords());
    }
    private letterCorrection(i: number) {
        this.stylizeLetter('correct', i);
    }
}
