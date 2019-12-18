export default class PodiumController {
    private model: any;
    private view: any;
    constructor(model: any, view: any) {
        this.model = model;
        this.view = view;
    }
    /**
     * @returns a new Podium view
     */
    public updateView() {
        this.view.setPodium(this.model.users);
        return this.view.display(this.model.getUsers());
    }
}
