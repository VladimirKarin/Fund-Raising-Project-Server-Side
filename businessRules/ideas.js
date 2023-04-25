const { getAllIdeas } = require('../models/ideas');

function getIdeas() {
    return getAllIdeas();
}

function sortedByDonationSumIdeas() {
    const ideasList = getIdeas();

    const sortedIdeasList = ideasList.sort(
        (a, b) => a.totalDonationSum - b.totalDonationSum
    );
    return sortedIdeasList;
}

module.exports = {
    getIdeas,
    sortedByDonationSumIdeas,
};
