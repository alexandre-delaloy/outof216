export interface IUser {
    pseudo: string;
    id: string;
}

export interface IStats {
    WPM: number;
    LPS: number;
    words: {
        count: number;
        success: number;
        fail: number;
        ratio: number
    };
}
