const { getUsers } = require('../utils/storage');

function checkIfUserNameProvided(userName) {
    if (!userName) {
        throw new Error('Error. There was no username provided.');
    }
}

function checkIfPasswordProvided(password) {
    if (!password) {
        throw new Error('Error. There was no password provided.');
    }
}

function checkIfUserNameAndPasswordMatches(userName, password) {
    let users = getUsers();

    const user = users.find(
        (user) => user.userName === userName && user.password === password
    );

    if (!user) {
        throw new Error('Error. No such user.');
    }

    return user;
}

function checkIfUserLoginSessionProvided(userLoginSession) {
    if (!userLoginSession) {
        throw new Error('Error. There was no users session data provided.');
    }
}

function checkIfUserLoginSessionMatches(userLoginSession) {
    let users = getUsers();

    const user = userLoginSession
        ? users.find((user) => user.session === userLoginSession)
        : null;

    if (!user) {
        throw new Error('You are not logged in.');
    }

    return user;
}

function checkIfUserIdMatches(userId) {
    let users = getUsers();

    const user = users.find((user) => userId === user.id);

    if (!user) {
        throw new Error('Error. No such user.');
    }

    return [users, user];
}

function checkIfKeyProvided(key) {
    if (!key) {
        throw new Error("Error. You didn't provide any key to update.");
    }
}

function checkIfValueProvided(value) {
    if (value === undefined) {
        throw new Error("Error. You didn't provide any value to update.");
    }
}

module.exports = {
    checkIfUserNameProvided,
    checkIfPasswordProvided,
    checkIfUserNameAndPasswordMatches,
    checkIfUserLoginSessionProvided,
    checkIfUserLoginSessionMatches,
    checkIfUserIdMatches,
    checkIfKeyProvided,
    checkIfValueProvided,
};
