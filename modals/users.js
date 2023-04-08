const { v4 } = require('uuid');
const md5 = require('md5');

function createUser(userName, password, firstName, lastName, sessionId) {
    const newUser = {};
    newUser.id = v4();
    newUser.picture = './img/default_userpic.webp';
    newUser.userName = userName;
    newUser.password = md5(password);
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.session = sessionId;
    newUser.role = 'user';

    return newUser;
}




module.exports = {
    createUser
}