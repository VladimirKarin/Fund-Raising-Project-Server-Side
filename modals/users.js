const { v4 } = require('uuid');
const md5 = require('md5');
const { getUsers, setUsers } = require('./utils/storage.js');

function deleteUser(userId) {
    let users = getUsers();
    const userToDelete = users.find(user => userId === user.id);

    if (userToDelete.role === 'admin') {
        throw new Error(`You cant't delete "Admin". `);
    }

    let updatedUsers = users.filter(user => userId !== user.id);
    setUsers(updatedUsers);

}