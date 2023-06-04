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

    let users = getUsers();
    const user = users.find((user) => userId === user.id);

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
    findIdea(ideaId);
    validateSum(sum);

    const searchResults = findUser(userId);
    let user = searchResults[1];

    let firstName = user.firstName;

    createDonation(firstName, sum, userId, ideaId);
}

function getIdeasTotalDonationSum(ideaId) {
    let idea = findIdeaWithTotalDonationSum(ideaId);

    return idea.totalDonationSum;
}

function getIdeasSumDifference(ideaId) {
    let searchResults = findIdea(ideaId);
    let idea = searchResults[1];

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
