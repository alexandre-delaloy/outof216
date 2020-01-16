import ChartsM from '../src/Models/ChartsModel';
import ChartsV from '../src/Views/ChartsView';
import ChartsC from '../src/Controllers/ChartsController';

import { FAKE_USER } from '../src/utils';

const $chart1 = document.createElement('div');
$chart1.id = 'ratioChart';
const $chart2 = document.createElement('div');
$chart2.id = 'wpmChart';

const $body = document.querySelector('body');
$body.appendChild($chart1);
$body.appendChild($chart2);

const _ChartsM = new ChartsM(FAKE_USER, 20);
const Charts = new ChartsC(
    _ChartsM,
    new ChartsV(),
    true,
);

test('Charts', () => {
    _ChartsM.setUser(FAKE_USER);
    _ChartsM.setRecordOfWpm(42);
    // Charts.displayView();
    // Charts.updateView();
});
