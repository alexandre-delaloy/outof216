export interface IUser {
    name: string;
    WPM: number;
    LPS: {
        all: number[],
        average: number,
    };
    words: {
        count: number;
        success: number;
        fail: number;
        ratio: number
    };
}
