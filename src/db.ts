import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/database';

import PodiumModel from './Models/PodiumModel';
import PodiumView from './Views/PodiumView';
import PodiumController from './Controllers/PodiumController';

import faker from 'faker';

import TypewriterModel from './Models/TypewriterModel';
import TypewriterView from './Views/TypewriterView';
import TypewriterController from './Controllers/TypewriterController';

import { IUser } from './types';

// tslint:disable-next-line: no-console
console.log('outof216 !');

declare var particlesJS: any;
fetch('/__/firebase/init.json').then(async response => {
    firebase.initializeApp(await response.json());

    firebase.analytics();
    const db = firebase.database();

    const readData = () => {
    const ref = db.ref('users');
    const PARSED_USERS: any[] = [];
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
        document.querySelector('#loader').className = 'hidden';
    });
};

    const parseRawData = () => {
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
    const writeUserData = (user: IUser) => {
db.ref('users/' + Math.random().toString(36).substring(7)).set({
...user,
});
};
    const twC = new TypewriterController(
    new TypewriterModel(parseRawData()),
    new TypewriterView(document.querySelector('#tw')),
        writeUserData,
);

    readData();
    twC.updateView();
    twC.handleKeys();

    particlesJS.load('particles-js', 'particles.json', null);

});
