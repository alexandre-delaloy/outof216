import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/database';
import axios from 'axios';

import ChartsModel from './Models/ChartsModel';
import chartView from './Views/ChartsView';
import ChartController from './Controllers/ChartsController';
import PodiumModel from './Models/PodiumModel';
import PodiumView from './Views/PodiumView';
import PodiumController from './Controllers/PodiumController';
import TypewriterController from './Controllers/TypewriterController';
import TypewriterModel from './Models/TypewriterModel';
import TypewriterView from './Views/TypewriterView';
import UserModel from './Models/UserModel';

import { IUser } from './types';

export const FAKE_USER: IUser = {
    name: 'John Doe',
    WPM: 0,
    LPS: 0,
    words: {
        count: 0,
        success: 0,
        fail: 0,
        ratio: 0,
    },
};

const chartM =  new ChartsModel(
    new UserModel(FAKE_USER, false).getUser(),
    0,
);
export const chartsC =  new ChartController(
    chartM,
    new chartView(),
    false,
);

export const loadFirebaseData = () => {
    fetch('/__/firebase/init.json').then(async response => {
        firebase.initializeApp(await response.json());
        firebase.analytics();
        const db = firebase.database();
        getUsers(db);
        getRandomWords(db);
    });
};

export const getUsers = (db: any) => {
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

        chartM.setRecordOfWpm(PARSED_USERS[0].WPM);

        const podiumC = new PodiumController(
            new PodiumModel(PARSED_USERS),
            new PodiumView(),
        );

        chartsC.displayView();
        podiumC.displayView();
        window.scrollTo(0, 0);

        setTimeout(() => {
            document.querySelector('#loader').className = 'hidden';
            podiumC.updateView();
            chartsC.updateView();
        }, 1000);
    });
};

export const getRandomWords = (db: any) => {
    const RANDOM_WORDS: string[] = [];
    axios.get('./words.json')
        .then(res => {
            let count: number = 0;
            while (count < 100) {
                const word = res.data.words[Math.floor(Math.random() * res.data.words.length)];
                if (word.length < 10 ) {
                    RANDOM_WORDS.push(word);
                    count++;
                }
            }
            const RANDOM_WORDS_SPLITTED: string[][] = RANDOM_WORDS.map((word: string) => {
                return word.split('');
            });
            initApp(RANDOM_WORDS_SPLITTED, db);
        });
};

export const initApp = (data: string[][], db: any) => {
    const typewriterC = new TypewriterController(
        new TypewriterModel(data),
        new TypewriterView(
            document.querySelector('#tw'),
        ),
        (user: any) => setNewUser(db, user),
    );

    typewriterC.updateView();
    typewriterC.handleKeys();
};

export const setNewUser = (db: any, user: IUser) => {
    db.ref(`users/${user.name}_${Math.random().toString(36).substring(7)}`).set({
        ...user,
    });
};
