import * as firebase from 'firebase';

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
