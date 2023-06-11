const { v4 } = require('uuid');
const md5 = require('md5');
const { getUsers, setUsers } = require('../utils/storage');

function createUser(username, password, firstName, lastName) {
    let users = getUsers();
    const newUser = {};
    newUser.id = v4();
    newUser.picture = './img/default_userpic.webp';
    newUser.username = username;
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
    let users = getUsers();
    let userToDelete = getUser(userId);

    if (userToDelete.role === 'admin') {
        throw new Error("You cant't delete 'Admin'.");
    }

    let updatedUsers = users.filter((user) => userId !== user.id);
    setUsers(updatedUsers);
}

function getUser(userId) {
    let users = getUsers();

    const user = users.find((user) => userId === user.id);

    if (!user) {
        throw new Error('Error. No such user.');
    }

    return user;
}

module.exports = {
    createUser,
    deleteUser,
    getUser,
};
