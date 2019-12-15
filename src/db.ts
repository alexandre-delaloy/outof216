import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/database';

import firebaseConfig from '../.firebase-config.json';

import PodiumModel from './Models/PodiumModel';
import PodiumView from './Views/PodiumView';
import PodiumController from './Controllers/PodiumController';

import { IUser } from './types';

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.database();

export const writeUserData = (user: IUser) => {
    db.ref('users/' + Math.random().toString(36).substring(7)).set({
        ...user,
        });
    };

export const readData = () => {
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
        document.querySelector('#loader').className = 'hidden';
    });
};
