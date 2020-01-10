import ClockM from '../src/Models/ClockModel';
import ClockV from '../src/Views/ClockView';
import ClockC from '../src/Controllers/ClockController';

const $clock = document.createElement('div');
const Clock = new ClockC(
    new ClockM(60),
    new ClockV($clock),
);

test('clock', () => {
    new ClockM(60).setSeconds(30)
    Clock.displayView();
    Clock.updateView();
})