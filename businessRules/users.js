const { v4 } = require('uuid');
const md5 = require('md5');
const { createUser } = require('../models/users');
const { getUsers, setUsers } = require('../utils/storage');

function registerUser(userName, password, firstName, lastName) {
    if (!userName) {
        throw new Error('Error. No Username provided');
    }
    if (!password) {
        throw new Error('Error. No password provided');
    }

    firstName = firstName || 'Anonymous';
    lastName = lastName || 'Incognito';

    createUser(userName, password, firstName, lastName);
}

function login(req, res) {
    let users = getUsers();

    const userName = req.body.userName;
    const password = md5(req.body.password);

    const user = users.find(
        (user) => user.userName === userName && user.password === password
    );

    if (!user) {
        throw new Error('No such user.');
    }

    const sessionId = md5(v4()); //Should be REAL cryptography.
    user.session = sessionId;
    setUsers(users);
    res.cookie('userLoginSession', sessionId, {
        sameSite: 'None',
        secure: true,
        httpOnly: true,
        maxAge: 900000,
    });
}

function usersList() {
    return getUsers();
}

function updateUser(userId, key, value) {
    let users = getUsers();

    const user = users.find((user) => userId === user.id);

    if (!user) {
        throw new Error('No such user.');
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

module.exports = {
    registerUser,
    login,
    usersList,
    updateUser,
};
