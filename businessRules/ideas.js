const {
    getAllIdeas,
    createIdea,
    updateIdea,
    deleteIdea,
} = require('../models/ideas');

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

function createIdeas(header, description, askedSum, userId) {
    if (header === null) {
        throw new Error('Error. Please, check your header.');
    } else if (description === null) {
        throw new Error('Error. Please, check your description.');
    } else if (askedSum === null) {
        throw new Error('Error. Please, check your asked sum.');
    } else if (userId === null) {
        throw new Error('Error. Please, check if you are logged in.');
    } else if (header && description && askedSum && userId) {
        createIdea(header, description, askedSum, userId);
    }
}

function ideasStatusApproval(ideaId, approvalStatus) {
    const ideas = getAllIdeas();
    const idea = ideas.find((idea) => idea.id === ideaId);

    if (approvalStatus === 'approved') {
        updateIdea(ideaId, 'approve', 'approved');
    } else {
        deleteIdea(ideaId);
    }
}

function pendingIdeasList() {
    const ideas = getAllIdeas();
    const pendingIdeas = ideas.filter((idea) => idea.approve === 'pending');
    return pendingIdeas;
}

module.exports = {
    getIdeas,
    sortedByDonationSumIdeas,
    createIdeas,
    ideasStatusApproval,
    pendingIdeasList,
};
