const { v4 } = require('uuid');
const md5 = require('md5');
const { createUser } = require('../models/users');
const { getUsers, setUsers } = require('../utils/storage');
const {
    validateUserName,
    validatePassword,
    findUserWithSameUserNameAndPassword,
    validateLoginSession,
    findUserByUserLoginSession,
    getUser,
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

function login(userName, password) {
    validateUserName(userName);

    validatePassword(password);

    const user = findUserWithSameUserNameAndPassword(userName, password);

    const sessionId = md5(v4()); //Should be REAL cryptography.

    updateUser(user.id, 'session', sessionId);

    return sessionId;
}

function deleteUserSession(userId) {
    updateUser(userId, 'session', null);
}

function logout(userLoginSession) {
    validateLoginSession(userLoginSession);

    const user = findUserByUserLoginSession(userLoginSession);

    deleteUserSession(user.id);
}

function updateUser(userId, key, value) {
    validateKey(key);

    validateValue(value);

    const users = getUsers(),
        user = getUser(userId);

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
    const user = findUserByUserLoginSession(userLoginSession);
    return user;
}

module.exports = {
    registerUser,
    login,
    usersList: getUsers,
    updateUser,
    logout,
    deleteUser,
    checkIfLoggedIn,
};
