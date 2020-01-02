import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/database';

import faker from 'faker';

import TypewriterModel from './Models/TypewriterModel';
import TypewriterView from './Views/TypewriterView';
import TypewriterController from './Controllers/TypewriterController';

import { readData, writeData, getParsedData } from './utils';
import Chart from 'chart.js';

declare var particlesJS: any;
fetch('/__/firebase/init.json').then(async response => {
    firebase.initializeApp(await response.json());

    firebase.analytics();
    const db = firebase.database();

    const twC = new TypewriterController(
        new TypewriterModel(getParsedData(faker)),
        new TypewriterView(
            document.querySelector('#tw'),
        ),
        (user: any) => writeData(db, user),
    );
    readData(db);

    twC.updateView();
    twC.handleKeys();

});

particlesJS.load('particles-js', 'particles.json', null);

Chart.defaults.global.animation.duration = 1500;