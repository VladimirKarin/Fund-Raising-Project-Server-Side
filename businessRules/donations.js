const { v4 } = require('uuid');
const { createDonation } = require('../models/donations');
const { updateIdea, getAllIdeas } = require('../models/ideas');

function donationData(firstName, sum, userId, ideaId) {
    if (firstName != null && userId != null) {
        const newDonation = createDonation(firstName, sum, userId, ideaId);
    } else if (firstName === null && userId === null) {
        const generateId = v4();
        userId = generateId;
        const anonymous = 'Anonymous';
        firstName = anonymous;
        const newDonation = createDonation(firstName, sum, userId, ideaId);
    } else if (userId === null) {
        const generateId = v4();
        userId = generateId;
        const newDonation = createDonation(firstName, sum, userId, ideaId);
    } else if (firstName === null) {
        const anonymous = 'Anonymous';
        firstName = anonymous;
        const newDonation = createDonation(firstName, sum, userId, ideaId);
    }
}

function ideasDonationSum(ideaId) {
    const ideas = getAllIdeas();
    const idea = ideas.find((idea) => idea.id === ideaId);
    const totalDonationSum = idea.totalDonationSum;
    return totalDonationSum;
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
    donationData,
    ideasDonationSum,
    ideasSumDifference,
};
