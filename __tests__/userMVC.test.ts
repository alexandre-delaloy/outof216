import UserM from '../src/Models/UserModel';
import UserV from '../src/Views/UserView';
import UserC from '../src/Controllers/UserController';

import { FAKE_USER } from '../src/utils';

const $user = document.createElement('div');
const User = new UserC(
    new UserM(FAKE_USER, false),
    new UserV($user),
);

test('User', () => {
    User.updateView();
    User.destroyView();
});
