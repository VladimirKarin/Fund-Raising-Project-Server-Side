const { v4 } = require('uuid');
const md5 = require('md5');
const { getUsers, setUsers } = require('./utils/storage.js');















function deleteUser(id) {
    let users = getUsers();
    const userToDelete = users.find(user => id === user.id);

    if (userToDelete.role === 'admin') {
        console.log(`You cant't delete "Admin". `);

    } else {
        let updatedUsers = users.filter(user => id !== user.id);
        setUsers(updatedUsers);
    }
}