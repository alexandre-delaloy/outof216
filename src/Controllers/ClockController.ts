export default class ClockController {
    private model: any;
    private view: any;
    constructor(model: any, view: any) {
        this.model = model;
        this.view = view;
    }
    public displayView() {
        return this.view.display(this.model.getSeconds());
    }
    public updateView() {
        return this.view.update(this.model.getSeconds());
    }
}
