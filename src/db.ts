import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/database';

import PodiumModel from './Models/PodiumModel';
import PodiumView from './Views/PodiumView';
import PodiumController from './Controllers/PodiumController';

import { IUser } from './types';

import firebaseConfig from '../.firebase-config.json';

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
        const user = USERS[key];
        PARSED_USERS.push(user);
      }
    }
    PARSED_USERS.sort((a, b) => {
      const keyA = a.WPM;
      const keyB = b.WPM;
      if (keyA < keyB) {
        return 1;
      }
      if (keyA > keyB) {
        return -1;
      }
      return 0;
  });
    const pdM = new PodiumModel(PARSED_USERS);
    const pdV = new PodiumView(document.querySelector('#podium'));
    const pdC = new PodiumController(pdM, pdV);
    pdC.updateView();
    document.querySelector('#loader').className = 'hidden';
  });
};
