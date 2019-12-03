import faker from 'faker';

import TypewriterController from './Controllers/TypewriterController';
import TypewriterModel from './Models/TypewriterModel';
import TypewriterView from './Views/TypewriterView';

const RANDOM_WORDS: string[] = [];

for (let i = 0; i < 100; i++) {
    RANDOM_WORDS.push(faker.lorem.word());
}

const RANDOM_WORDS_SPLITTED: string[][] = RANDOM_WORDS.map((word: string) => {
    return word.split('');
});

const twModel = new TypewriterModel(RANDOM_WORDS_SPLITTED);
const twView = new TypewriterView(document.querySelector('.typewriter'));
const twController = new TypewriterController(twModel, twView);

twController.updateView();
twController.handleKeys();
