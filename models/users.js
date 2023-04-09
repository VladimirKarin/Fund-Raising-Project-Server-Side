const { v4 } = require('uuid');
const md5 = require('md5');
const { getUsers, setUsers } = require('./utils/storage.js');

function createUser(userName, password, firstName, lastName) {
    const newUser = {};
    newUser.id = v4();
    newUser.picture = './img/default_userpic.webp';
    newUser.userName = userName;
    newUser.password = md5(password);
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.session = null;
    newUser.role = 'user';

    return newUser;
}

function deleteUser(userId) {
    let users = getUsers();
    const userToDelete = users.find(user => userId === user.id);

    if (userToDelete.role === 'admin') {
        throw new Error(`You cant't delete "Admin". `);
    }

    let updatedUsers = users.filter(user => userId !== user.id);
    setUsers(updatedUsers);

}

module.exports = {
    createUser,
    deleteUser
}