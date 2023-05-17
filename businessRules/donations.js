const { v4 } = require('uuid');
const { createDonation } = require('../models/donations');
const { updateIdea, getAllIdeas } = require('../models/ideas');
const { getIdeas } = require('../utils/storage');

function createDonationsWithDataValidation(firstName, sum, userId, ideaId) {
    let ideas = getIdeas();
    const idea = ideas.find((idea) => ideaId === idea.id);

    if (!idea) {
        throw new Error(`Error. No idea with such ID found..`);
    }

    const generateId = v4();
    const anonymous = 'Anonymous';

    firstName = firstName || anonymous;
    userId = userId || generateId;

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
