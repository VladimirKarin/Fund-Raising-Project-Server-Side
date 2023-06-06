const { getUsers } = require('../utils/storage');

function validateUserName(userName) {
    if (!userName) {
        throw new Error('Error. There was no username provided.');
    }
}

function validatePassword(password) {
    if (!password) {
        throw new Error('Error. There was no password provided.');
    }
}

function getUserWithSameUserNameAndPassword(userName, password) {
    let users = getUsers();

    const user = users.find(
        (user) => user.userName === userName && user.password === password
    );

    if (!user) {
        throw new Error('Error. No such user.');
    }

    return user;
}

function validateLoginSession(userLoginSession) {
    if (!userLoginSession) {
        throw new Error('Error. There was no users session data provided.');
    }
}

function getUserByUserLoginSession(userLoginSession) {
    let users = getUsers();

    const user = userLoginSession
        ? users.find((user) => user.session === userLoginSession)
        : null;

    if (!user) {
        throw new Error('You are not logged in.');
    }

    return user;
}

function getUser(userId) {
    let users = getUsers();

    const user = users.find((user) => userId === user.id);

    if (!user) {
        throw new Error('Error. No such user.');
    }

    return user;
}

function validateKey(key) {
    if (!key) {
        throw new Error("Error. You didn't provide any key to update.");
    }
}

function validateValue(value) {
    if (value === undefined || value === 'undefined') {
        throw new Error("Error. You didn't provide any value to update.");
    }
}

module.exports = {
    validateUserName,
    validatePassword,
    getUserWithSameUserNameAndPassword,
    validateLoginSession,
    getUserByUserLoginSession,
    getUser,
    validateKey,
    validateValue,
};
