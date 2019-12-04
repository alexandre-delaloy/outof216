import { IUser, IStats } from '../types';

export default class UserModel {
    private user: IUser;
    private stats: IStats;
    private progression: any[];
    constructor(user: IUser, stats: IStats, progression: any[]) {
        this.user = user;
        this.stats = stats;
        this.progression = progression;
    }
    public getUser() {
        return this.user;
    }
    public setUser(newUser: IUser) {
        this.user = newUser;
    }
    public getStats() {
        return this.stats;
    }
    public setStats(newStats: IStats) {
        this.stats = newStats;
    }
    public getProgression() {
        return this.progression;
    }
    public setProgression(newProgression: any[]) {
        this.progression = newProgression;
    }
}
