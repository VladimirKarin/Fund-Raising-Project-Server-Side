const { createUser } = require('../models/users');

function registerUser(userName, password, firstName, lastName) {
    if (firstName === null && lastName === null) {
        const noFirstName = 'Anonymous';
        firstName = noFirstName;
        const noLastName = 'Incognito';
        lastName = noLastName;
        createUser(userName, password, firstName, lastName);
    } else if (firstName === null) {
        const noFirstName = 'Anonymous';
        firstName = noFirstName;
        createUser(userName, password, firstName, lastName);
    } else if (lastName === null) {
        const noLastName = 'Incognito';
        lastName = noLastName;
        createUser(userName, password, firstName, lastName);
    } else {
        createUser(userName, password, firstName, lastName);
    }
}

module.exports = {
    registerUser,
};
