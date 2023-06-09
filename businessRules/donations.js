const { v4 } = require('uuid');
const { createDonation } = require('../models/donations');
const { validateIdea } = require('../validations/ideas');
const { validateSum } = require('../validations/donations.js');
const { getUser } = require('./users');
const { getIdea } = require('./ideas');
const { setUsers } = require('../utils/storage');

function createAnonymousUser(firstName) {
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
    setUsers(anonymousUser);
    return anonymousUser;
}

function createDonationByUnregisteredUser(ideaId, firstName, sum) {
    validateIdea(ideaId);
    validateSum(sum);
    const anonymousUser = createAnonymousUser(firstName);
    createDonation(ideaId, anonymousUser.id, sum);
}

function createDonationByRegisteredUser(userId, ideaId, sum) {
    validateIdea(ideaId);
    validateSum(sum);

    const user = getUser(userId);

    createDonation(ideaId, user.id, sum);
}

function getTotalSumDonatedForIdea(ideaId) {
    const idea = getIdea(ideaId);

    return idea.totalDonationSum;
}

function getIdeasSumLeftToDonate(ideaId) {
    const idea = getIdea(ideaId);

    const ideasSum = idea.askedSum;

    const totalDonationSumForThisIdea = getTotalSumDonatedForIdea(ideaId);

    const askedSumAndDonationSumDifference =
        ideasSum - totalDonationSumForThisIdea;

    return askedSumAndDonationSumDifference;
}

module.exports = {
    createDonationByUnregisteredUser,
    createDonationByRegisteredUser,
    getTotalSumDonatedForIdea,
    getIdeasSumLeftToDonate,
};
