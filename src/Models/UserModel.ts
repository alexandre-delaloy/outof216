import { IUser } from '../types';

export default class UserModel {
    private user: IUser;
    private progression: any[];
    private isPopin: boolean;
    constructor(
        user: IUser,
        isPopin: boolean,
        progression?: any[],
    ) {
        this.user = user;
        this.isPopin = isPopin;
        this.progression = progression;
    }
    public getUser() {
        return this.user;
    }
    public setUser(newUser: IUser) {
        this.user = newUser;
    }
    public getIsPopin() {
        return this.isPopin;
    }
    public setIsPopin(newIsPopin: boolean) {
        this.isPopin = newIsPopin;
    }
    public getProgression() {
        return this.progression;
    }
    public setProgression(newProgression: any[]) {
        this.progression = newProgression;
    }
}
