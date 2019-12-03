import keyboardManager from './utils/keyboardManager';
import TypewriterController from './Controllers/TypewriterController';
import TypewriterModel from './Models/TypewriterModel';
import TypewriterView from './Views/TypewriterView';

const RANDOM_WORDS: string[] = ['italia', 'am', 'an', 'array', 'of', 'random', 'words'];
const RANDOM_WORDS_SPLITTED: string[][] = RANDOM_WORDS.map((word: string) => {
    return word.split('');
});

// tslint:disable-next-line: no-unused-expression
const twModel = new TypewriterModel(RANDOM_WORDS_SPLITTED);
const twView = new TypewriterView(document.querySelector('.typewriter'));
const twController = new TypewriterController(twModel, twView);

twController.updateView();
twController.handleType();

keyboardManager();
