import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/database';

import faker from 'faker';

import TypewriterModel from './Models/TypewriterModel';
import TypewriterView from './Views/TypewriterView';
import TypewriterController from './Controllers/TypewriterController';

import PodiumModel from './Models/PodiumModel';
import PodiumView from './Views/PodiumView';
import PodiumController from './Controllers/PodiumController';

import { getRawData, setData, getParsedData } from './utils';

declare var particlesJS: any;

firebase.analytics();
const db = firebase.database();

const twC = new TypewriterController(
    new TypewriterModel(getParsedData(faker)),
    new TypewriterView(
        document.querySelector('#tw'),
    ),
    (user: any) => setData(db, user),
);

const pdC = new PodiumController(
    new PodiumModel(getRawData(db)),
    new PodiumView(document.querySelector('#podium')),
);
pdC.updateView();
window.scrollTo(0, 0);
document.querySelector('#loader').className = 'hidden';
twC.updateView();
twC.handleKeys();

particlesJS.load('particles-js', 'particles.json', null);
