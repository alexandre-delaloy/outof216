import UserM from '../src/Models/UserModel';
import UserV from '../src/Views/UserView';
import UserC from '../src/Controllers/UserController';

import { FAKE_USER } from '../src/utils';

const $user = document.createElement('div');

const _UserM = new UserM(FAKE_USER, false);
const User = new UserC(
    _UserM,
    new UserV($user),
);

test('User', () => {
    _UserM.setUser(FAKE_USER);
    _UserM.setIsPopin(false);
    User.updateView();
    User.destroyView();
});
