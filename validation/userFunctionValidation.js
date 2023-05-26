const { getUsers } = require('../utils/storage');

function checkingUserNameExistence(userName) {
    if (!userName) {
        throw new Error('Error. There was no username provided.');
    }
}

function checkingPasswordExistence(password) {
    if (!password) {
        throw new Error('Error. There was no password provided.');
    }
}

function checkingIfUserNameAndPasswordMatchesUsersData(userName, password) {
    let users = getUsers();

    const user = users.find(
        (user) => user.userName === userName && user.password === password
    );

    if (!user) {
        throw new Error('Error. No such user.');
    }

    return user;
}

module.exports = {
    checkingUserNameExistence,
    checkingPasswordExistence,
    checkingIfUserNameAndPasswordMatchesUsersData,
};
