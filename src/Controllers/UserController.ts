export default class UserController {
    private model: any;
    private view: any;
    constructor(model: any, view: any) {
        this.model = model;
        this.view = view;
    }
    public updateView() {
        return this.view.display(
            this.model.getUser(),
            this.model.getStats(),
            this.model.getProgression(),
        );
    }
    public getRatio() {
        return this.model.stats.words.success / this.model.stats.words.count;
    }
}
