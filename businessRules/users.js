const { v4 } = require('uuid');
const md5 = require('md5');
const { createUser } = require('../models/users');
const { getUsers, setUsers } = require('../utils/storage');
const {
    validateUserName,
    validatePassword,
    validateLoginSession,
    validateValue,
    validateKey,
} = require('../validations/users.js');

function registerUser(userName, password, firstName, lastName) {
    validateUserName(userName);

    validatePassword(password);

    firstName = firstName || 'Anonymous';
    lastName = lastName || 'Incognito';

    createUser(userName, password, firstName, lastName);
}

function getUser(userId) {
    let users = getUsers();

    const user = users.find((user) => userId === user.id);

    if (!user) {
        throw new Error('Error. No such user.');
    }

    return user;
}

function findRegisteredUser(userName, password) {
    let users = getUsers();

    const user = users.find(
        (user) => user.userName === userName && user.password === password
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
    updateUser(user.id, 'session', sessionId);
}

function login(userName, password) {
    validateUserName(userName);

    validatePassword(password);

    const user = findRegisteredUser(userName, password);

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
    getUser,
    findRegisteredUser,
    findLoggedInUser,
    login,
    usersList: getUsers,
    updateUser,
    logout,
    deleteUser,
    checkIfLoggedIn,
};
