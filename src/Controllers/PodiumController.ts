export default class PodiumController {
    private model: any;
    private view: any;
    private isTest: boolean;
    constructor(model: any, view: any, isTest: boolean) {
        this.model = model;
        this.view = view;
    }
    public displayView() {
        return this.view.display(this.model.getUsers());
    }
    public updateView() {
        if (!this.isTest) {
            return this.view.update(this.model.getUsers());
        }
    }
}
