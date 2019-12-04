import faker from 'faker';

import TypewriterModel from './Models/TypewriterModel';
import TypewriterView from './Views/TypewriterView';
import TypewriterController from './Controllers/TypewriterController';

const RANDOM_WORDS: string[] = [];

for (let i = 0; i < 100; i++) {
    RANDOM_WORDS.push(faker.lorem.word());
}

const RANDOM_WORDS_SPLITTED: string[][] = RANDOM_WORDS.map((word: string) => {
    return word.split('');
});

const twM = new TypewriterModel(RANDOM_WORDS_SPLITTED);
const twV = new TypewriterView(document.querySelector('#tw'));
const twC = new TypewriterController(twM, twV);

twC.updateView();
twC.handleKeys();
