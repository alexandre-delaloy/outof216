export default class ClockController {
    private model: any;
    private view: any;
    constructor(model: any, view: any) {
        this.model = model;
        this.view = view;
    }
    /**
     * @return a new Clock view
     */
    public updateView() {
        return this.view.displayTimer(this.model.getSeconds());
    }
}
