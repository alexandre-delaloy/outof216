import PodiumM from '../src/Models/PodiumModel';
import PodiumV from '../src/Views/PodiumView';
import PodiumC from '../src/Controllers/PodiumController';

import { FAKE_USER } from '../src/utils';

const $podium = document.createElement('div');
$podium.id = 'podiumChart';
document.querySelector('body').appendChild($podium);

const FAKE_USERS = [
    FAKE_USER,
    FAKE_USER,
    FAKE_USER,
];
const _PodiumM = new PodiumM(FAKE_USERS);
const Podium = new PodiumC(
    _PodiumM,
    new PodiumV(),
    true,
);

test('Podium', () => {
    _PodiumM.setUsers(FAKE_USERS);
    Podium.displayView();
    Podium.updateView();
});
