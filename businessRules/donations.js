const { v4 } = require('uuid');
const { createDonation } = require('../models/donations');
const { validateIdea } = require('../validations/ideas');
const { validateSum } = require('../validations/donations.js');
const { setUsers, getUsers } = require('../utils/storage');
const { getUser } = require('../models/users');
const { getIdea } = require('../models/ideas');

function createAnonymousUser(firstName) {
    let users = getUsers();

    const userId = v4();
    const defaultFirstName = 'Anonymous';
    const defaultUsername = 'none';
    const defaultPassword = 'none';
    const defaultLastName = 'none';
    const defaultSession = 'none';
    const defaultRole = 'guest';

    if (!firstName) {
        firstName = defaultFirstName;
    }

    const anonymousUser = {
        id: userId,
        picture: './img/default_userpic.webp',
        userName: defaultUsername,
        password: defaultPassword,
        firstName,
        lastName: defaultLastName,
        session: defaultSession,
        role: defaultRole,
    };
    const updatedUsers = [...users, anonymousUser];
    setUsers(updatedUsers);
    return anonymousUser;
}

function createDonationByUnregisteredUser(ideaId, firstName, sum) {
    validateIdea(ideaId);
    validateSum(sum);
    const anonymousUser = createAnonymousUser(firstName);
    createDonation(ideaId, anonymousUser.id, sum);
}

function createDonationByRegisteredUser(userId, ideaId, sum) {
    const user = getUser(userId);

    validateIdea(ideaId);
    validateSum(sum);

    createDonation(ideaId, user.id, sum);
}

function getTotalSumDonatedForIdea(ideaId) {
    const idea = getIdea(ideaId);

    return idea.totalDonationSum;
}
module.exports = {
    createDonationByUnregisteredUser,
    createDonationByRegisteredUser,
    getTotalSumDonatedForIdea,
};
