import faker from 'faker';

import TypewriterModel from './Models/TypewriterModel';
import TypewriterView from './Views/TypewriterView';
import TypewriterController from './Controllers/TypewriterController';

import './db';

const RANDOM_WORDS: string[] = [];

let count = 0;
while (count < 100) {
    const word = faker.random.word();
    if (
        !word.match(' ') &&
        !word.match('-') &&
        !word.match(/[A-Z]/g) &&
        !word.match(/[0-9]/g) &&
        word.length < 10
    ) {
        RANDOM_WORDS.push(word);
        count++;
    }

}

const RANDOM_WORDS_SPLITTED: string[][] = RANDOM_WORDS.map((word: string) => {
    return word.split('');
});

const twM = new TypewriterModel(RANDOM_WORDS_SPLITTED);
const twV = new TypewriterView(document.querySelector('#tw'));
const twC = new TypewriterController(twM, twV);

twC.updateView();
twC.handleKeys();
