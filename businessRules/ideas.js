const { getAllIdeas, createIdea, updateIdea } = require('../models/ideas');
const {
    checkIfHeaderProvided,
    checkIfDescriptionProvided,
    checkIfUserIdProvided,
    checkIfAskedSumProvided,
    checkIfIdeaIdMatches,
} = require('../validation/ideaFunctionValidation');

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
    checkIfHeaderProvided(header);

    checkIfDescriptionProvided(description);

    checkIfAskedSumProvided(askedSum);

    checkIfUserIdProvided(userId);

    createIdea(header, description, askedSum, userId);
}

function updateIdeasStatus(ideaId, isApproved) {
    // Check if idea with this ideaId exists.
    checkIfIdeaIdMatches(ideaId);

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
    getIdeas,
    sortedByDonationSumIdeas,
    createIdeas,
    updateIdeasStatus,
    pendingIdeasList,
    approvedIdeasList,
    rejectedIdeasList,
};
