import { tsConstructorType } from "@babel/types";

export default class TypewriterController {
    private model: any;
    private view: any;
    constructor(model: any, view: any) {
        this.model = model;
        this.view = view;
    }
    public updateView() {
        return this.view.displayWords(this.model.words);
    }
    public handleType() {
        let i: number = 0;
        let validated: boolean = false;
        let executed: boolean = false;
        return window.addEventListener('keydown', (e) => {
            let LETTER = this.model.getWords()[0][i];
            if (e.key === this.model.getWords()[0][i]) {
                this.model.getWords()[0][i] = `<i style="color:lightgreen;">${LETTER}</i>`;
                this.model.setWords(this.model.getWords());
                i++;
                if (i === this.model.getWords()[0].length) {
                    validated = true;
                }

                this.updateView();
            } else {
               if (!validated) {
                    if (!executed) {
                        this.model.getWords()[0][i] = `<i style="color:red;">${LETTER}</i>`;
                        executed = true;
                    }
                    this.model.setWords(this.model.getWords());
                    
                    if (e.code === 'Backspace') {
                        this.model.getWords()[0][i] = LETTER.match(/>[a-z]/g).join().replace('>', '');
                    }
                    this.updateView();
                }
                
            }
            if (e.code === 'Space' && validated) {
                i = 0;
                validated = false;
                return this.removeFirstWord();
            } else {
                return;
            }
        });
    }
    private removeFirstWord() {
        this.model.getWords().shift();
        this.model.setWords(this.model.getWords());
        return this.updateView();
    }
}
