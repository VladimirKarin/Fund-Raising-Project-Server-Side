const { v4 } = require('uuid');
const { createDonation } = require('../models/donations');
const { getAllIdeas } = require('../models/ideas');
const { getIdeas } = require('../utils/storage');

function createDonation(firstName, sum, userId, ideaId) {
    let ideas = getIdeas();
    const idea = ideas.find((idea) => ideaId === idea.id);

    if (!idea) {
        throw new Error(`Error. No idea with such ID found.`);
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

    if (!idea) {
        throw new Error(`Error. No idea with such ID found.`);
    }
    return idea.totalDonationSum;
}

function ideasSumDifference(ideaId) {
    const ideas = getAllIdeas();
    const idea = ideas.find((idea) => idea.id === ideaId);

    if (!idea) {
        throw new Error(`Error. No idea with such ID found.`);
    }

    const ideasSum = idea.askedSum;

    const totalDonationSumForThisIdea = ideasDonationSum(ideaId);
    const askedSumAndDonationSumDifference =
        ideasSum - totalDonationSumForThisIdea;

    return askedSumAndDonationSumDifference;
}

module.exports = {
    createDonation,
    ideasDonationSum,
    ideasSumDifference,
};
