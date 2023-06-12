const {
    getIdeas,
    createNewIdea,
    updateIdea,
    createIdea,
} = require('../models/ideas');
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
    const ideas = getIdeas();

    const sortedIdeasList = ideas.sort(
        (ideaA, ideaB) => ideaA.totalDonationSum - ideaB.totalDonationSum
    );
    return sortedIdeasList;
}

function createNewIdea(header, description, askedSum, userId) {
    validateHeader(header);

    validateDescription(description);

    validateAskedSum(askedSum);

    validateUserId(userId);

    createIdea(header, description, askedSum, userId);
}

function updateIdeasStatus(ideaId, isApproved) {
    // Check if idea with this ideaId exists.
    validateIdea(ideaId);

    // Idea exists.
    const ideaStatus = isApproved ? IDEA_STATUS.accepted : IDEA_STATUS.rejected;

    updateIdea(ideaId, 'status', ideaStatus);
}

function getPendingIdeas() {
    const ideas = getIdeas();

    const pendingIdeas = ideas.filter(
        (idea) => idea.status === IDEA_STATUS.pending
    );
    return pendingIdeas;
}

function getApprovedIdeas() {
    const ideas = getIdeas();

    const approvedIdeas = ideas.filter(
        (idea) => idea.status === IDEA_STATUS.accepted
    );
    return approvedIdeas;
}

function getRejectedIdeas() {
    const ideas = getIdeas();

    const rejectedIdeas = ideas.filter(
        (idea) => idea.status === IDEA_STATUS.rejected
    );
    return rejectedIdeas;
}

module.exports = {
    sortIdeasByTotalDonationSum,
    createNewIdea,
    updateIdeasStatus,
    getPendingIdeas,
    getApprovedIdeas,
    getRejectedIdeas,
};
