function validateUsername(Username) {
    if (!Username) {
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
    if (value === undefined || value === 'undefined') {
        throw new Error("Error. You didn't provide any value to update.");
    }
}

function validateUserId(userId) {
    if (!userId) {
        throw new Error('Error. Please, check if you are logged in.');
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
