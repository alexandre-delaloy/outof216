import { IUser } from '../types';

export default class ChartsModel {
    private user: IUser;
    private recordOfWpm: number;
    constructor(user: IUser, recordofWpm: number) {
        this.user = user;
        this.recordOfWpm = recordofWpm;
    }
    public getUser() {
        return this.user;
    }
    public setUser(newUser: IUser) {
        this.user = newUser;
    }
    public getRecordOfWpm() {
        return this.recordOfWpm;
    }
    public setRecordOfWpm(newRecordOfWpm: number) {
        this.recordOfWpm = newRecordOfWpm;
    }
}
