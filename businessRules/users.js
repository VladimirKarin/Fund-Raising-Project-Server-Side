const { v4 } = require('uuid');
const md5 = require('md5');
const { createUser } = require('../models/users');
const { getUsers, setUsers } = require('../utils/storage');

function registerUser(userName, password, firstName, lastName) {
    const noFirstName = 'Anonymous';
    const noLastName = 'Incognito';

    if (!firstName) {
        firstName = noFirstName;
    }

    if (!lastName) {
        lastName = noLastName;
    }

    createUser(userName, password, firstName, lastName);
}

function login(req, res) {
    let users = getUsers();

    const userName = req.body.userName;
    const password = md5(req.body.password);

    const user = users.find(
        (user) => user.userName === userName && user.password === password
    );

    if (user) {
        const sessionId = md5(v4()); //Should be REAL cryptography.
        user.session = sessionId;
        setUsers(users);
        res.cookie('userLoginSession', sessionId, {
            sameSite: 'None',
            secure: true,
            httpOnly: true,
            maxAge: 900000,
        });
        res.status(200).json({ status: 'OK', username: user.userName });
    } else {
        res.status(400).json({ status: 'No such user.' });
    }
}

function usersList() {
    return getUsers();
}

module.exports = {
    registerUser,
    login,
    usersList,
};
