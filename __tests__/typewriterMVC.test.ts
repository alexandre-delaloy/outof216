import TypewriterModel from '../src/Models/TypewriterModel';
import TypewriterView from '../src/Views/TypewriterView';
import TypewriterController from '../src/Controllers/TypewriterController';

const WORDS = [
    [ 'f', 'o', 'o' ],
    [ 'b', 'a', 'r' ],
];

const ultraJoin = (array: string[][]): string => {
    return array.join().replace(/,/g, '');
}


const twModel = new TypewriterModel(WORDS);
const twView = new TypewriterView(document.querySelector('body'));
const twController = new TypewriterController(twModel, twView);

test('model', () => {

    expect(ultraJoin(twModel.getWords())).toMatch(/foobar/g);

    twModel.setWords([
        [ 'b', 'a', 'r' ],
        [ 'f', 'o', 'o' ],
    ])

    expect(ultraJoin(twModel.getWords())).toMatch(/barfoo/g);
});

test('view', () => {
    twController.updateView();
})

test('controller', () => {
    twController.handleKeys();
})