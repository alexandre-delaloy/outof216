declare var particlesJS: any;
declare var pJSDom: any;

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
            particlesJS.load('overlay', 'particles.json', () => {
                const $p2 = pJSDom[1].pJS.particles;
                $p2.color.value = '#ff9d00';
                $p2.opacity.value = 0.4;
                $p2.line_linked.color = '#444';
                $p2.line_linked.opacity = 0.333;
                pJSDom[1].pJS.fn.particlesRefresh();
            });

            $overlay.addEventListener('click', e => {
                e.stopPropagation();
                this.destroyView();
            });
        }
    }
    private displayStats() {
        this.view.setDoughnut(
            this.model.getUser().words.success,
            this.model.getUser().words.fail,
            this.model.getUser().words.ratio,
        );
        this.view.setChart(
            this.model.getUser().WPM,
            42,
        );
    }
    private updateStats() {
        this.view.updateDoughnut(
            this.model.getUser().words.success,
            this.model.getUser().words.fail,
        );
        this.view.updateChart(this.model.getUser().WPM);
    }

}
