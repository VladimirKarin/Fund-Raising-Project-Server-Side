const { getUsers } = require('../utils/storage');

function validateUsername(username) {
    if (!username) {
        throw new Error('Error. There was no Username provided.');
    }
}

function validatePassword(password) {
    if (!password) {
        throw new Error('Error. There was no password provided.');
    }
}

function validateLoginSession(userLoginSession) {
    if (!userLoginSession) {
        throw new Error('Error. There was no users session data provided.');
    }
}

function validateKey(key) {
    if (!key) {
        throw new Error("Error. You didn't provide any key to update.");
    }
}

function validateValue(value) {
    if (value === undefined) {
        throw new Error("Error. You didn't provide any value to update.");
    }
}

function validateUserId(userId) {
    if (!userId) {
        throw new Error('Error. There was no userId provided.');
    }
    let users = getUsers();

    const user = users.find((user) => userId === user.id);
    if (!user) {
        throw new Error('Error. No user with such ID found.');
    }
}

module.exports = {
    validateUsername,
    validatePassword,
    validateLoginSession,
    validateKey,
    validateValue,
    validateUserId,
};
