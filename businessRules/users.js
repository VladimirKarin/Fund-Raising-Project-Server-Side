const { v4 } = require('uuid');
const md5 = require('md5');
const { createUser } = require('../models/users');
const { getUsers, setUsers } = require('../utils/storage');
const {
    isUserNameValid,
    isPasswordValid,
    userWithMatchingUserNameAndPassword,
    isLoginSessionValid,
    userWithMatchingLoginSession,
    userWithMatchingUserId,
    isValueValid,
    isKeyValid,
} = require('../validation/userfunctionValidation');

function registerUser(userName, password, firstName, lastName) {
    isUserNameValid(userName);

    isPasswordValid(password);

    firstName = firstName || 'Anonymous';
    lastName = lastName || 'Incognito';

    createUser(userName, password, firstName, lastName);
}

function login(userName, password) {
    isUserNameValid(userName);

    isPasswordValid(password);

    const user = userWithMatchingUserNameAndPassword(userName, password);

    const sessionId = md5(v4()); //Should be REAL cryptography.

    updateUser(user.id, 'session', sessionId);

    return sessionId;
}

function deleteUserSession(userId) {
    updateUser(userId, 'session', null);
}

function logout(userLoginSession) {
    isLoginSessionValid(userLoginSession);

    const user = userWithMatchingLoginSession(userLoginSession);

    deleteUserSession(user.id);
}

function updateUser(userId, key, value) {
    isKeyValid(key);

    isValueValid(value);

    let validationResults = userWithMatchingUserId(userId);

    let users = validationResults[0],
        user = validationResults[1];

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
    let validationResults = userWithMatchingUserId(userId);
    let users = validationResults[0];

    let updatedUsers = users.filter((user) => userId !== user.id);

    setIdeas(updatedUsers);
}

function checkIfLoggedIn(userLoginSession) {
    const user = userWithMatchingLoginSession(userLoginSession);
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
