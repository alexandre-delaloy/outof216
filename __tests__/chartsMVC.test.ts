import ChartsM from '../src/Models/ChartsModel';
import ChartsV from '../src/Views/ChartsView';
import ChartsC from '../src/Controllers/ChartsController';

import UserModel from '../src/Models/UserModel';

import { FAKE_USER } from '../src/utils';

const userM = new UserModel(FAKE_USER, false);

const $chart1 = document.createElement('div');
$chart1.id = 'ratioChart';
const $chart2 = document.createElement('div');
$chart2.id = 'wpmChart';

const $body = document.querySelector('body');
$body.appendChild($chart1);
$body.appendChild($chart2);

const Charts = new ChartsC(
    new ChartsM(userM.getUser(), 20),
    new ChartsV(),
    true,
);

test('Charts', () => {
    Charts.displayView();
    Charts.updateView();
});
