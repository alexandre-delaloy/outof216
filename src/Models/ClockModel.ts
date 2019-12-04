export default class ClockModel {
    private seconds: number;
    constructor(seconds: number) {
        this.seconds = seconds;
    }
    public getSeconds() {
        return this.seconds;
    }
    public setSeconds(newSeconds: number) {
        this.seconds = newSeconds;
    }
}
