import PodiumModel from './Models/PodiumModel';
import PodiumView from './Views/PodiumView';
import PodiumController from './Controllers/PodiumController';

import { IUser } from './types';

export const ph = {
    user: {
        name: 'John Doe',
        WPM: 0,
        LPS: 0,
        words: {
            count: 0,
            success: 0,
            fail: 0,
            ratio: 0,
        },
    },
};

export const readData = (db: any) => {
    const ref = db.ref('users');
    const PARSED_USERS: IUser[] = [];
    ref.on('value', (snapshot: any) => {
        const USERS = snapshot.val();
        for (const key in USERS) {
            if (USERS.hasOwnProperty(key)) {
                PARSED_USERS.push(USERS[key]);
            }
        }
        PARSED_USERS.sort((a, b) => {
            if (a.WPM < b.WPM) {
                return 1;
            }
            if (a.WPM > b.WPM) {
                return -1;
            }
            return 0;
        });
        const pdC = new PodiumController(
            new PodiumModel(PARSED_USERS),
            new PodiumView(document.querySelector('#podium')),
        );
        pdC.updateView();
        window.scrollTo(0, 0);
        setTimeout(() => {
            document.querySelector('#loader').className = 'hidden';
            pdC.updateChart();
        }, 1000);

    });
    return PARSED_USERS;
};

export const writeData = (db: any, user: IUser) => {
    db.ref('users/' + Math.random().toString(36).substring(7)).set({
        ...user,
    });
};

export const getParsedData = (faker: any) => {
    const RANDOM_WORDS: string[] = [];
    let count: number = 0;
    while (count < 100) {
        const word = faker.random.word();
        if (
            !word.match(' ') &&
            !word.match('-') &&
            !word.match(/[A-Z]/g) &&
            !word.match(/[0-9]/g) &&
            word.length < 10
        ) {
            RANDOM_WORDS.push(word);
            count++;
        }
    }
    const RANDOM_WORDS_SPLITTED: string[][] = RANDOM_WORDS.map((word: string) => {
        return word.split('');
    });
    return RANDOM_WORDS_SPLITTED;
};
