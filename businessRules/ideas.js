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
        (ideaA, ideaB) => ideaA.totalDonationSum - ideaB.totalDonationSum
    );
    return sortedIdeasList;
}

function createIdeas(header, description, askedSum, userId) {
    if (!header) {
        throw new Error('Error. Please, check your header.');
    }

    if (!description) {
        throw new Error('Error. Please, check your description.');
    }

    if (!askedSum) {
        throw new Error('Error. Please, check your asked sum.');
    }

    if (!userId) {
        throw new Error('Error. Please, check if you are logged in.');
    }

    createIdea(header, description, askedSum, userId);
}

function ideasStatusApproval(ideaId, isApproved) {
    const ideas = getAllIdeas();
    const idea = ideas.find((idea) => idea.id === ideaId);

    if (!idea) {
        throw new Error(`Error. No idea with such ID found.`);
    }

    isApproved ? updateIdea(ideaId, 'approve', 'approved') : deleteIdea(ideaId);
}

function pendingIdeasList() {
    const ideas = getAllIdeas();
    const pendingIdeas = ideas.filter((idea) => idea.approve === 'pending');
    return pendingIdeas;
}

function approvedIdeasList() {
    const ideas = getAllIdeas();
    const approvedIdeas = ideas.filter((idea) => idea.approve === 'approved');
    return approvedIdeas;
}

module.exports = {
    getIdeas,
    sortedByDonationSumIdeas,
    createIdeas,
    ideasStatusApproval,
    pendingIdeasList,
    approvedIdeasList,
};
