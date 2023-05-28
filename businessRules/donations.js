const { v4 } = require('uuid');
const { createDonation } = require('../models/donations');
const {
    ideaThatMatchesIdeaId,
} = require('../validation/ideaFunctionValidation');
const {
    checkIfSumIsANumber,
    ideaWithTotalDonationSumThatMatchesIdeaId,
} = require('../validation/donationFunctionValidation');

function createDonationsWithDataValidation(firstName, sum, userId, ideaId) {
    ideaThatMatchesIdeaId(ideaId);

    checkIfSumIsANumber(sum);

    const generateId = v4();
    const anonymous = 'Anonymous';

    firstName = firstName || anonymous;
    userId = userId || generateId;

    createDonation(firstName, sum, userId, ideaId);
}

function ideasDonationSum(ideaId) {
    let idea = ideaWithTotalDonationSumThatMatchesIdeaId(ideaId);

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
    createDonationsWithDataValidation,
    ideasDonationSum,
    ideasSumDifference,
};
