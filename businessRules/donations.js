const { v4 } = require('uuid');
const { createDonation } = require('../models/donations');
const { getIdea, validateIdea } = require('../validations/ideas');
const { validateSum } = require('../validations/donations.js');
const { getUser } = require('../validations/users');

function createDonationByUnregisteredUser(sum, userId, ideaId) {
    validateIdea(ideaId);
    validateSum(sum);

    const user = getUser(userId);

    let firstName;

    if (!user) {
        const generateId = v4();
        const anonymous = 'Anonymous';

        firstName = firstName || anonymous;
        userId = userId || generateId;
    }
    createDonation(firstName, sum, userId, ideaId);
}

function createDonationByRegisteredUser(sum, userId, ideaId) {
    validateSum(sum);

    const user = getUser(userId);

    const firstName = user.firstName;

    createDonation(firstName, sum, userId, ideaId);
}

function getTotalSumDonatedForIdea(ideaId) {
    const idea = getIdea(ideaId);

    return idea.totalDonationSum;
}

function getIdeasSumDifference(ideaId) {
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
    getIdeasSumDifference,
};
