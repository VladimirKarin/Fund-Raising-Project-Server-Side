const { v4 } = require('uuid');
const md5 = require('md5');
const { createUser } = require('../models/users');
const { getUsers, setUsers } = require('../utils/storage');

function registerUser(userName, password, firstName, lastName) {
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
        res.status(400).json({ status: 'No such user.' });
        return;
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
    res.status(200).json({
        status: 'OK',
        username: user.userName,
        statusMessage: 'You have successfully logged in.',
    });
}

function usersList() {
    return getUsers();
}

function logout(req, res) {
    res.clearCookie('userLoginSession', {
        sameSite: 'None',
        secure: true,
        httpOnly: true,
        sameSite: 'None',
    });
    res.status(200).json({
        status: 'OK',
        statusMessage: 'You have successfully logged out.',
    });
}

function updateUser(userId, key, value) {
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

    let updatedUsers = users.filter((user) => userId !== user.id);

    setIdeas(updatedUsers);
}
function checkIfLoggedIn(req, res) {
    let users = getUsers();

    const user = req.cookies.userLoginSession
        ? users.find((user) => user.session === req.cookies.userLoginSession)
        : null;

    if (!user) {
        res.status(401).json({
            status: 'error',
            message: 'You are not Logged in.',
        });
    }

    res.status(200).json({
        status: 'OK',
        message: 'You are Logged in.',
        name: user.firstName,
        role: user.role,
    });
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
