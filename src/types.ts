export interface IUser {
    pseudo: string;
    id: string;
}

export interface IStats {
    WPM: number;
    LPS: number;
    words: {
        success: number;
        fail: number;
        ratio: number
    };
}
