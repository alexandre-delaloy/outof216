export default class UserModel {
    private WPM: number;
    private LPS: number;
    private ratio: number;
    private progression: any[];
    constructor(WPM: number, LPS: number, ratio: number, progression: any[]) {
        this.WPM = WPM;
        this.LPS = LPS;
        this.ratio = ratio;
        this.progression = progression;
    }
    public getWPM() {
        return this.WPM;
    }
    public setWPM(newWPM: number) {
        this.WPM = newWPM;
    }
    public getLPS() {
        return this.LPS;
    }
    public setLPS(newLPS: number) {
        this.LPS = newLPS;
    }
    public getRatio() {
        return this.ratio;
    }
    public setRatio(newRatio: number) {
        this.ratio = newRatio;
    }
    public getProgression() {
        return this.progression;
    }
    public setprogression(newProgression: any[]) {
        this.progression = newProgression;
    }
}