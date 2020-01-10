export default class ChartController {
    private model: any;
    private view: any;
    private isTest: boolean;
    constructor(model: any, view: any, isTest: boolean) {
        this.model = model;
        this.view = view;
        this.isTest = isTest;
    }
    public displayView() {
        return this.view.display(
            this.model.getUser(),
            this.model.getRecordOfWpm(),
        );
    }
    public updateView() {
        if (!this.isTest) {
            return this.view.update(
                this.model.getUser(),
                this.model.getRecordOfWpm(),
            );
        }
    }
}
