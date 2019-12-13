import { IUser } from '../types';

export default class PodiumModel {
    private users: IUser[];
    constructor(users: IUser[]) {
        this.users = users;
    }
    public getUsers() {
        return this.users;
    }
    public setUsers(newUsers: IUser[]) {
        this.users = newUsers;
    }
}
