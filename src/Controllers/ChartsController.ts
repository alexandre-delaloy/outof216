export default class ChartController {
    private model: any;
    private view: any;
    constructor(model: any, view: any ) {
        this.model = model;
        this.view = view;
    }
    public displayView() {
        this.view.display(this.model.getUser());
    }
    public updateView() {
        this.view.update(this.model.getUser());
    }
}
