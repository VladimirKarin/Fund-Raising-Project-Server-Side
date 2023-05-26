const { v4 } = require('uuid');
const { createDonation } = require('../models/donations');
const { getAllIdeas } = require('../models/ideas');
const { getIdeas } = require('../utils/storage');
const {
    checkIfIdeaIdMatches,
} = require('../validation/ideaFunctionValidation');
const {
    checkIfSumIsANumber,
    checkIfIdeaIdMatchesIdea,
} = require('../validation/donationFunctionValidation');

function createDonationsWithDataValidation(firstName, sum, userId, ideaId) {
    checkIfIdeaIdMatches(ideaId);

    checkIfSumIsANumber(sum);

    const generateId = v4();
    const anonymous = 'Anonymous';

    firstName = firstName || anonymous;
    userId = userId || generateId;

    createDonation(firstName, sum, userId, ideaId);
}

function ideasDonationSum(ideaId) {
    let idea = checkIfIdeaIdMatchesIdea(ideaId);

    return idea.totalDonationSum;
}

function ideasSumDifference(ideaId) {
    let idea = checkIfIdeaIdMatchesIdea(ideaId);

    const ideasSum = idea.askedSum;

    const totalDonationSumForThisIdea = ideasDonationSum(ideaId);

    const askedSumAndDonationSumDifference =
        ideasSum - totalDonationSumForThisIdea;

    return askedSumAndDonationSumDifference;
}

module.exports = {
    createDonationsWithDataValidation,
    ideasDonationSum,
    ideasSumDifference,
};
