const { v4 } = require('uuid');
const { createDonation } = require('../models/donations');
const { findIdeaWithSameId } = require('../validations/ideas');
const {
    validateSum,
    findIdeaWithTotalDonationSumWithSameId,
} = require('../validations/donations.js');

function createDonations(firstName, sum, userId, ideaId) {
    findIdeaWithSameId(ideaId);

    validateSum(sum);

    const generateId = v4();
    const anonymous = 'Anonymous';

    firstName = firstName || anonymous;
    userId = userId || generateId;

    createDonation(firstName, sum, userId, ideaId);
}

function ideasDonationSum(ideaId) {
    let idea = findIdeaWithTotalDonationSumWithSameId(ideaId);

    return idea.totalDonationSum;
}

function ideasSumDifference(ideaId) {
    let idea = checkIfIdeaIdMatchesIdeas(ideaId);

    const ideasSum = idea.askedSum;

    const totalDonationSumForThisIdea = ideasDonationSum(ideaId);

    const askedSumAndDonationSumDifference =
        ideasSum - totalDonationSumForThisIdea;

    return askedSumAndDonationSumDifference;
}

module.exports = {
    createDonations,
    ideasDonationSum,
    ideasSumDifference,
};
