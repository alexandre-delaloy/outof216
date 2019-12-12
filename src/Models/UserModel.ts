import { IUser } from '../types';

export default class UserModel {
    private user: IUser;
    private progression: any[];
    constructor(
        user?: IUser,
        progression?: any[],
    ) {
        this.user = user;
        this.progression = progression;
    }
    public getUser() {
        return this.user;
    }
    public setUser(newUser: IUser) {
        this.user = newUser;
    }
    public getProgression() {
        return this.progression;
    }
    public setProgression(newProgression: any[]) {
        this.progression = newProgression;
    }
}
