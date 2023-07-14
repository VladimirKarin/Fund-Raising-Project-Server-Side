const { v4 } = require('uuid');
const { createDonation } = require('../models/donations');
const { validateIdea } = require('../validations/ideas');
const { validateSum } = require('../validations/donations');
const { setUsers, getUsers, getDonations } = require('../utils/storage');
const { getUser, findUser } = require('../models/users');
const { getIdea } = require('../models/ideas');
const { validateUserId } = require('../validations/users');

function createAnonymousUser(firstName) {
    let users = getUsers();

    const userId = v4();
    const defaultFirstName = 'Anonymous';
    const defaultUsername = null;
    const defaultPassword = null;
    const defaultLastName = null;
    const defaultSession = null;
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

function createDonationByRegisteredUser(ideaId, userId, sum) {
    const user = getUser(userId);

    validateIdea(ideaId);
    validateSum(sum);

    createDonation(ideaId, user.id, sum);
}

function getTotalSumDonatedForIdea(ideaId) {
    const idea = getIdea(ideaId);

    return {
        totalSumDonatedForIdea: idea.totalDonationSum,
    };
}

function getDonationsForIdea(ideaId) {
    validateIdea(ideaId);
    const donations = getDonations();
    const donationsForIdea = donations.filter(
        (donation) => ideaId == donation.ideaId
    );
    return donationsForIdea;
}

function getUsersDonations(userId) {
    validateUserId(userId);
    const donations = getDonations();
    const usersDonations = donations.filter(
        (donation) => userId == donation.userId
    );
    return usersDonations;
}
module.exports = {
    createDonationByUnregisteredUser,
    createDonationByRegisteredUser,
    getTotalSumDonatedForIdea,
    getDonationsForIdea,
    getUsersDonations,
};
