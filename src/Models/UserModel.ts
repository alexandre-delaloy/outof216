import { IUser } from '../types';

export default class UserModel {
    private user: IUser;
    private progression: any[];
    private isPopin: boolean;
    constructor(
        user: IUser,
        isPopin: boolean,
    ) {
        this.user = user;
        this.isPopin = isPopin;
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
}
