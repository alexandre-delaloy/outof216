export interface IUser {
    name: string;
    WPM: number;
    LPS: number;
    words: {
        count: number;
        success: number;
        fail: number;
        ratio: number
    };
}
