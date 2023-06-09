const { v4 } = require('uuid');
const { createDonation } = require('../models/donations');
const { validateIdea } = require('../validations/ideas');
const { validateSum } = require('../validations/donations.js');
const { getUser } = require('./users');
const { getIdea } = require('./ideas');

function createAnonymousUser(firstName) {
    userId = v4();

    const anonymous = 'Anonymous';
    firstName = firstName || anonymous;
}

function createDonationByUnregisteredUser(sum, firstName, ideaId) {
    validateIdea(ideaId);
    validateSum(sum);
    let userId;
    createAnonymousUser(firstName);
    createDonation(firstName, sum, userId, ideaId);
}

function createDonationByRegisteredUser(sum, userId, ideaId) {
    validateSum(sum);

    const user = getUser(userId);

    createDonation(user.firstName, sum, user.id, ideaId);
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
