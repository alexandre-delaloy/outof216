import { IUser } from '../types';

export default class ChartsModel {
    private user: IUser;
    constructor(user: IUser) {
        this.user = user;
    }
    public getUser() {
        return this.user;
    }
    public setUser(newUser: IUser) {
        this.user = newUser;
    }
}
