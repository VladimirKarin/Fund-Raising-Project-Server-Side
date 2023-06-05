const { findIdea } = require('./ideas');

function validateSum(sum) {
    if (!Number.isInteger(sum)) {
        throw new Error('Sum should be a number.');
    }
}

function findIdeaWithTotalDonationSum(ideaId) {
    const idea = findIdea(ideaId);
    return idea.totalDonationSum;
}

module.exports = {
    validateSum,
    findIdeaWithTotalDonationSum,
};
