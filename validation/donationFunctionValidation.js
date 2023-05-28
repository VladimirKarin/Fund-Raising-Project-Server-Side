const { getAllIdeas } = require('../models/ideas');

function checkIfSumIsANumber(sum) {
    if (!Number.isInteger(sum)) {
        throw new Error('Sum should be a number.');
    }
}

function ideaWithTotalDonationSumThatMatchesIdeaId(ideaId) {
    const ideas = getAllIdeas();
    const idea = ideas.find((idea) => idea.id === ideaId);

    if (!idea) {
        throw new Error('Error. No idea with such ID found.');
    }
    return idea;
}

module.exports = {
    checkIfSumIsANumber,
    ideaWithTotalDonationSumThatMatchesIdeaId,
};
