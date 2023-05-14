const { v4 } = require('uuid');
const { createDonation } = require('../models/donations');
const { updateIdea, getAllIdeas } = require('../models/ideas');

function createDonationsWithDataValidation(firstName, sum, userId, ideaId) {
    const generateId = v4();
    const anonymous = 'Anonymous';

    firstName = firstName || anonymous;
    userId = userId || generateId;

    // if (!firstName && !userId) {
    //     firstName = anonymous;
    //     userId = generateId;
    // }

    // if (!userId) {
    //     userId = generateId;
    // }

    // if (!firstName) {
    //     firstName = anonymous;
    // }
    createDonation(firstName, sum, userId, ideaId);
}

function ideasDonationSum(ideaId) {
    const ideas = getAllIdeas();
    const idea = ideas.find((idea) => idea.id === ideaId);
    return idea.totalDonationSum;
}

function ideasSumDifference(ideaId) {
    const ideas = getAllIdeas();
    const idea = ideas.find((idea) => idea.id === ideaId);

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
