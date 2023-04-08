const { v4 } = require('uuid');
const md5 = require('md5');

function createUser(userName, password) {
    const newUser = {};
    newUser.id = v4();
    newUser.picture = './img/default_userpic.webp';
    newUser.userName = userName;
    newUser.password = password;
    newUser.firstName = '';
    newUser.lastName = '';
    newUser.role = 'user';

    return newUser;
}

module.exports = {
    createUser
}