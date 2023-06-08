function validateUserName(userName) {
    if (!userName) {
        throw new Error('Error. There was no username provided.');
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
    if (value === undefined || value === 'undefined') {
        throw new Error("Error. You didn't provide any value to update.");
    }
}

module.exports = {
    validateUserName,
    validatePassword,
    validateLoginSession,
    validateKey,
    validateValue,
};
