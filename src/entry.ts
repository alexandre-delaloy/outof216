import faker from 'faker';

import TypewriterModel from './Models/TypewriterModel';
import TypewriterView from './Views/TypewriterView';
import TypewriterController from './Controllers/TypewriterController';

import './db';
import { readData } from './db';

declare var particlesJS: any;

const parseRawData = () => {
    const RANDOM_WORDS: string[] = [];
    let count: number = 0;
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
    return RANDOM_WORDS_SPLITTED;
};

const twC = new TypewriterController(
    new TypewriterModel(parseRawData()),
    new TypewriterView(document.querySelector('#tw')),
);

readData();
twC.updateView();
twC.handleKeys();

particlesJS.load('particles-js', 'particles.json', null);
