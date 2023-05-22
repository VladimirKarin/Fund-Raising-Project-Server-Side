const { v4 } = require('uuid');
const md5 = require('md5');
const { createUser } = require('../models/users');
const { getUsers, setUsers } = require('../utils/storage');

function registerUser(userName, password, firstName, lastName) {
    if (!userName) {
        throw new Error('Error. There was no username provided.');
    }
    if (!password) {
        throw new Error('Error. There was no password provided.');
    }

    firstName = firstName || 'Anonymous';
    lastName = lastName || 'Incognito';

    createUser(userName, password, firstName, lastName);
}

function login(userName, password) {
    if (!userName) {
        throw new Error('Error. There was no username provided.');
    }
    if (!password) {
        throw new Error('Error. There was no password provided.');
    }

    let users = getUsers();

    const user = users.find(
        (user) => user.userName === userName && user.password === password
    );

    if (!user) {
        throw new Error('Error. No such user.');
    }

    const sessionId = md5(v4()); //Should be REAL cryptography.
    updateUser(user.id, 'session', sessionId);

    return sessionId;
}

function usersList() {
    return getUsers();
}

function deleteUserSession(userId) {
    updateUser(userId, 'session', null);
}

function logout(userLoginSession) {
    if (!userLoginSession) {
        throw new Error('Error. There was no users session data provided.');
    }

    let users = getUsers();

    const user = userLoginSession
        ? users.find((user) => user.session === userLoginSession)
        : null;

    if (!user) {
        throw new Error('You are not logged in.');
    }

    deleteUserSession(user.id);
}

function updateUser(userId, key, value) {
    if (!key) {
        throw new Error("Error. You didn't provide any key to update.");
    }
    if (value === undefined) {
        throw new Error("Error. You didn't provide any value to update.");
    }

    let users = getUsers();

    const user = users.find((user) => userId === user.id);

    if (!user) {
        throw new Error('Error. No such user.');
    }

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
    let users = getUsers();

    const user = users.find((user) => userId === user.id);

    if (!user) {
        throw new Error('Error. No user with such ID found.');
    }

    let updatedUsers = users.filter((user) => userId !== user.id);

    setIdeas(updatedUsers);
}

function checkIfLoggedIn(userLoginSession) {
    if (!userLoginSession) {
        throw new Error('Error. There was no users session data provided.');
    }

    let users = getUsers();

    const user = userLoginSession
        ? users.find((user) => user.session === userLoginSession)
        : null;

    if (!user) {
        throw new Error('You are not logged in.');
    }
    return user;
}

module.exports = {
    registerUser,
    login,
    usersList,
    updateUser,
    logout,
    deleteUser,
    checkIfLoggedIn,
};
