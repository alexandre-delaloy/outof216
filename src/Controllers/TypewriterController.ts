export default class TypewriterController {
    private model: any;
    private view: any;
    private letterIndex: number;
    private isWordCompleted: boolean;
    private isLetterRight: boolean;
    private executed: boolean;
    private executed2: boolean;
    private hasToBeDeleted: boolean;
    constructor(model: any, view: any) {
        this.model = model;
        this.view = view;
        this.letterIndex = 0;
        this.isWordCompleted = false;
        this.isLetterRight = false;
        this.executed = false;
        this.executed2 = false;
        this.hasToBeDeleted = false;
    }
    public updateView() {
        return this.view.displayWords(this.model.words);
    }
    public stylizeLetter(type: string, i: number) {
        switch (type) {
            case 'right':
                console.warn('💚 - right letter');
                return this.model.getWords()[0][i] = `<i style="color:lightgreen;">${this.model.getWords()[0][i]}</i>`;
            case 'wrong':
                console.warn('❤️ - wrong letter');
                return this.model.getWords()[0][i] = `<i style="color:red;">${this.model.getWords()[0][i]}</i>`;
            case 'correct':
                console.warn('💛 - corrected letter');
                return this.model.getWords()[0][i] = this.model.getWords()[0][i]
                    .match(/>[a-z]/g)
                    .join()
                    .replace('>', '');
        }
        return this.model.setWords(this.model.getWords());
    }
    public wordValidation() {
        console.warn('💜 - word validated');
        this.model.getWords().shift();
        this.model.setWords(this.model.getWords());
    }
    public letterCorrection(i: number) {
        this.stylizeLetter('correct', i);
    }
    public handleType() {
        let isWordFinished: boolean = false;
        let hasToBeCorrected: boolean = false;
        let i: number = 0;
        return window.addEventListener('keydown', (e) => {
            if (e.key === this.model.getWords()[0][i]) {
                this.stylizeLetter('right', i);
                i++;
                if (i === this.model.getWords()[0].length) {
                    console.warn('💙 - finished');
                    isWordFinished = true;
                }
            } else {
                if (e.code === 'Space') {
                    if (isWordFinished) {
                        this.wordValidation();
                        isWordFinished = false;
                        i = 0;
                    }
                } else if (e.code === 'Backspace') {
                    if (!isWordFinished && hasToBeCorrected) {
                        this.letterCorrection(i);
                        hasToBeCorrected = false;
                    }
                } else {
                    this.stylizeLetter('wrong', i);
                    hasToBeCorrected = true;
                }
            }
            return this.updateView();
        });
    }

}
