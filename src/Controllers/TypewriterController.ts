import keyboardManager from '../utils/keyboardManager';

export default class TypewriterController {
    private model: any;
    private view: any;
    constructor(model: any, view: any) {
        this.model = model;
        this.view = view;
    }
    public updateView() {
        return this.view.display(this.model.words);
    }
    public handleType() {
        window.addEventListener('keydown', (e) => {
            if (e.key === this.model.getWords()[0][0]) {
                this.model.getWords()[0].shift();
                this.model.setWords(this.model.getWords());
                this.updateView();
            }
        });
    }
}
