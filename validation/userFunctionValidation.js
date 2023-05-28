const { getUsers } = require('../utils/storage');

function isUserNameValid(userName) {
    if (!userName) {
        throw new Error('Error. There was no username provided.');
    }
}

function isPasswordValid(password) {
    if (!password) {
        throw new Error('Error. There was no password provided.');
    }
}

function userWithMatchingUserNameAndPassword(userName, password) {
    let users = getUsers();

    const user = users.find(
        (user) => user.userName === userName && user.password === password
    );

    if (!user) {
        throw new Error('Error. No such user.');
    }

    return user;
}

function isLoginSessionValid(userLoginSession) {
    if (!userLoginSession) {
        throw new Error('Error. There was no users session data provided.');
    }
}

function userWithMatchingLoginSession(userLoginSession) {
    let users = getUsers();

    const user = userLoginSession
        ? users.find((user) => user.session === userLoginSession)
        : null;

    if (!user) {
        throw new Error('You are not logged in.');
    }

    return user;
}

function userWithMatchingUserId(userId) {
    let users = getUsers();

    const user = users.find((user) => userId === user.id);

    if (!user) {
        throw new Error('Error. No such user.');
    }

    return [users, user];
}

function isKeyValid(key) {
    if (!key) {
        throw new Error("Error. You didn't provide any key to update.");
    }
}

function isValueValid(value) {
    if (value === undefined || value === 'undefined') {
        throw new Error("Error. You didn't provide any value to update.");
    }
}

module.exports = {
    isUserNameValid,
    isPasswordValid,
    userWithMatchingUserNameAndPassword,
    isLoginSessionValid,
    userWithMatchingLoginSession,
    userWithMatchingUserId,
    isKeyValid,
    isValueValid,
};
