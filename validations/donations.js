const { getAllIdeas } = require('../models/ideas');

function validateSum(sum) {
    if (!Number.isInteger(sum)) {
        throw new Error('Sum should be a number.');
    }
}

function findIdeaWithTotalDonationSum(ideaId) {
    const ideas = getAllIdeas();
    const idea = ideas.find((idea) => idea.id === ideaId);

    if (!idea) {
        throw new Error('Error. No idea with such ID found.');
    }
    return idea;
}

module.exports = {
    validateSum,
    findIdeaWithTotalDonationSum,
};
