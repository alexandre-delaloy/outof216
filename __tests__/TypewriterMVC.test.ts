import TypewriterM from '../src/Models/TypewriterModel';
import TypewriterV from '../src/Views/TypewriterView';
import TypewriterC from '../src/Controllers/TypewriterController';

import { setNewUser } from '../src/utils';

const $typewriter = document.createElement('div');

const $user = document.createElement('div');
$user.id = 'user';
const $timer = document.createElement('div');
$timer.id = 'timer';

const $body = document.querySelector('body');
$body.appendChild($user);
$body.appendChild($timer);

const WORDS = [
    ['f', 'o', 'o'],
    ['b', 'a', 'r'],
];
const _TypewriterM = new TypewriterM(WORDS);
const Typewriter = new TypewriterC(
    _TypewriterM,
    new TypewriterV($typewriter),
    (user: any) => setNewUser(null, user),
);

test('Typewriter', () => {
    _TypewriterM.setWords(WORDS);
    Typewriter.updateView();
    Typewriter.handleKeys();
});
