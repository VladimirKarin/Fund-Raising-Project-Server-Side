const { v4 } = require('uuid');
const md5 = require('md5');
const { createUser, getUser } = require('../models/users');
const { getUsers, setUsers } = require('../utils/storage');
const {
    validateUsername,
    validatePassword,
    validateLoginSession,
    validateValue,
    validateKey,
} = require('../validations/users.js');

function registerUser(username, password, firstName, lastName) {
    validateUsername(username);

    validatePassword(password);

    firstName = firstName || 'Anonymous';
    lastName = lastName || 'Incognito';

    createUser(username, password, firstName, lastName);
}

function findRegisteredUser(username, password) {
    let users = getUsers();

    const user = users.find(
        (user) => user.username === username && user.password === password
    );

    if (!user) {
        throw new Error('Error. No such user.');
    }

    return user;
}

function findLoggedInUser(userLoginSession) {
    let users = getUsers();

    const user = userLoginSession
        ? users.find((user) => user.session === userLoginSession)
        : null;

    if (!user) {
        throw new Error('You are not logged in.');
    }

    return user;
}

function setSessionId(userId, sessionId) {
    updateUser(userId, 'session', sessionId);
}

function login(username, password) {
    validateUsername(username);

    validatePassword(password);

    const user = findRegisteredUser(username, password);

    const sessionId = md5(v4()); //Should be REAL cryptography.

    setSessionId(user.id, sessionId);

    return sessionId;
}

function deleteUserSession(userId) {
    updateUser(userId, 'session', null);
}

function logout(userLoginSession) {
    validateLoginSession(userLoginSession);

    const user = findLoggedInUser(userLoginSession);

    deleteUserSession(user.id);
}

function updateUser(userId, key, value) {
    validateKey(key);

    validateValue(value);

    const users = getUsers();
    const user = getUser(userId);

    const updatedUser = {
        ...user,
        [key]: value,
    };

    function reduceFunction(previousValue, user) {
        if (user.id === userId) {
            return [...previousValue, updatedUser];
        }
        return [...previousValue, user];
    }

    const initialReduceValue = [];
    const updatedUsers = users.reduce(reduceFunction, initialReduceValue);

    setUsers(updatedUsers);
}

function deleteUser(userId) {
    const users = getUsers();

    const updatedUsers = users.filter((user) => userId !== user.id);

    setUsers(updatedUsers);
}

function checkIfLoggedIn(userLoginSession) {
    const user = findLoggedInUser(userLoginSession);
    return user;
}

module.exports = {
    registerUser,
    findRegisteredUser,
    findLoggedInUser,
    login,
    usersList: getUsers,
    updateUser,
    logout,
    deleteUser,
    checkIfLoggedIn,
};
