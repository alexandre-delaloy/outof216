export default class UserController {
    private model: any;
    private view: any;
    constructor(model: any, view: any) {
        this.model = model;
        this.view = view;
    }
    public updateView() {
        this.closePopin();
        return this.view.display(
            this.model.getUser(),
            this.model.getIsPopin(),
            this.model.getProgression(),
        );
    }
    public destroyView() {
        return this.view.destroy();
    }
    private closePopin() {
        document.querySelector('#popin').addEventListener('click', e => {
            e.stopPropagation();
            this.destroyView();
        })
    }
}
