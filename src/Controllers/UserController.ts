declare var particlesJS: any;

export default class UserController {
    private model: any;
    private view: any;
    constructor(model: any, view: any) {
        this.model = model;
        this.view = view;
    }
    public updateView() {
        this.view.display(
            this.model.getUser(),
            this.model.getIsPopin(),
            this.model.getProgression(),
        );
        this.closePopin();
    }
    public destroyView() {
        return this.view.destroy();
    }
    private closePopin() {
        const $overlay = document.querySelector('#overlay');
        if ($overlay) {
            particlesJS.load('overlay', 'particles2.json', null);

            $overlay.addEventListener('click', e => {
                e.stopPropagation();
                this.destroyView();
            });
        }
    }
}
