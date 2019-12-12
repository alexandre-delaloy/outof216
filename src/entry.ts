import faker from 'faker';

import TypewriterModel from './Models/TypewriterModel';
import TypewriterView from './Views/TypewriterView';
import TypewriterController from './Controllers/TypewriterController';

import './db';

const RANDOM_WORDS: string[] = [];

for (let i = 0; i < 100; i++) {
    const word = faker.random.word();
    if (
        !word.match(' ') &&
        !word.match('-') &&
        !word.match(/[A-Z]/g)
    ) {
        RANDOM_WORDS.push(word);
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
