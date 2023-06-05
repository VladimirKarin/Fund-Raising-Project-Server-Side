const { v4 } = require('uuid');
const { createDonation } = require('../models/donations');
const { findIdea } = require('../validations/ideas');
const {
    validateSum,
    findIdeaWithTotalDonationSum,
} = require('../validations/donations.js');
const { findUser } = require('../validations/users');
const { getUsers } = require('../utils/storage');

function createDonationByUnregisteredUser(sum, userId, ideaId) {
    findIdea(ideaId);
    validateSum(sum);

    const users = getUsers();
    const user = findUser(userId);

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

    const user = findUser(userId);

    const firstName = user.firstName;

    createDonation(firstName, sum, userId, ideaId);
}

function getIdeasTotalDonationSum(ideaId) {
    const idea = findIdeaWithTotalDonationSum(ideaId);

    return idea.totalDonationSum;
}

function getIdeasSumDifference(ideaId) {
    const idea = findIdea(ideaId);

    const ideasSum = idea.askedSum;

    const totalDonationSumForThisIdea = getIdeasTotalDonationSum(ideaId);

    const askedSumAndDonationSumDifference =
        ideasSum - totalDonationSumForThisIdea;

    return askedSumAndDonationSumDifference;
}

module.exports = {
    createDonationByUnregisteredUser,
    createDonationByRegisteredUser,
    getIdeasTotalDonationSum,
    getIdeasSumDifference,
};
