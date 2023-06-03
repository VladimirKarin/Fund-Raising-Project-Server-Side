const { v4 } = require('uuid');
const md5 = require('md5');
const { getUsers, setUsers } = require('../utils/storage');
const { findUserWithSameId } = require('../validations/users.js');

function createUser(userName, password, firstName, lastName) {
    let users = getUsers();
    const newUser = {};
    newUser.id = v4();
    newUser.picture = './img/default_userpic.webp';
    newUser.userName = userName;
    newUser.password = md5(password);
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.session = null;
    newUser.role = 'user';

    const newUsers = [...users, newUser];
    setUsers(newUsers);

    return newUser.id;
}

function deleteUser(userId) {
    let validationResults = findUserWithSameId(userId);
    let users = validationResults[0],
        userToDelete = validationResults[1];

    if (userToDelete.role === 'admin') {
        throw new Error("You cant't delete 'Admin'.");
    }

    let updatedUsers = users.filter((user) => userId !== user.id);
    setUsers(updatedUsers);
}

module.exports = {
    createUser,
    deleteUser,
};
