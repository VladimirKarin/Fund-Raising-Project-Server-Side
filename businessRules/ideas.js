const { getAllIdeas, createNewIdea, updateIdea } = require('../models/ideas');
const {
    validateHeader,
    validateDescription,
    validateAskedSum,
    validateIdea,
} = require('../validations/ideas');
const { validateUserId } = require('../validations/users');

const IDEA_STATUS = {
    pending: 'pending',
    accepted: 'accepted',
    rejected: 'rejected',
};

function sortIdeasByTotalDonationSum() {
    const ideasList = getAllIdeas();

    const sortedIdeasList = ideasList.sort(
        (ideaA, ideaB) => ideaA.totalDonationSum - ideaB.totalDonationSum
    );
    return sortedIdeasList;
}

function createIdea(header, description, askedSum, userId) {
    validateHeader(header);

    validateDescription(description);

    validateAskedSum(askedSum);

    validateUserId(userId);

    createNewIdea(header, description, askedSum, userId);
}

function updateIdeasStatus(ideaId, isApproved) {
    // Check if idea with this ideaId exists.
    validateIdea(ideaId);

    // Idea exists.
    const ideaStatus = isApproved ? IDEA_STATUS.accepted : IDEA_STATUS.rejected;

    updateIdea(ideaId, 'status', ideaStatus);
}

function pendingIdeasList() {
    const ideas = getAllIdeas();

    const pendingIdeas = ideas.filter(
        (idea) => idea.status === IDEA_STATUS.pending
    );
    return pendingIdeas;
}

function approvedIdeasList() {
    const ideas = getAllIdeas();

    const approvedIdeas = ideas.filter(
        (idea) => idea.status === IDEA_STATUS.accepted
    );
    return approvedIdeas;
}

function rejectedIdeasList() {
    const ideas = getAllIdeas();

    const rejectedIdeas = ideas.filter(
        (idea) => idea.status === IDEA_STATUS.rejected
    );
    return rejectedIdeas;
}

module.exports = {
    sortIdeasByTotalDonationSum,
    createIdea,
    updateIdeasStatus,
    pendingIdeasList,
    approvedIdeasList,
    rejectedIdeasList,
};
