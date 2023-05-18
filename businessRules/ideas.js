const { getAllIdeas, createIdea, updateIdea } = require('../models/ideas');

const IDEA_STATUS = {
    pending: 'pending',
    accepted: 'accepted',
    rejected: 'rejected',
};

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
    // Check if idea with this ideaId exists.
    const ideas = getAllIdeas();
    const idea = ideas.find((idea) => idea.id === ideaId);

    if (!idea) {
        throw new Error(`Error. No idea with such ID found.`);
    }
    // Idea exists.
    isApproved
        ? updateIdea(ideaId, 'approve', IDEA_STATUS.accepted)
        : updateIdea(ideaId, 'approve', IDEA_STATUS.rejected);
}

function pendingIdeasList() {
    const ideas = getAllIdeas();

    const pendingIdeas = ideas.filter(
        (idea) => idea.approve === IDEA_STATUS.pending
    );
    return pendingIdeas;
}

function approvedIdeasList() {
    const ideas = getAllIdeas();

    const approvedIdeas = ideas.filter(
        (idea) => idea.approve === IDEA_STATUS.accepted
    );
    return approvedIdeas;
}

function rejectedIdeasList() {
    const ideas = getAllIdeas();

    const rejectedIdeas = ideas.filter(
        (idea) => idea.approve === IDEA_STATUS.rejected
    );
    return rejectedIdeas;
}

module.exports = {
    getIdeas,
    sortedByDonationSumIdeas,
    createIdeas,
    ideasStatusApproval,
    pendingIdeasList,
    approvedIdeasList,
    rejectedIdeasList,
};
