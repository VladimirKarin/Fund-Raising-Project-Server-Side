const { getAllIdeas } = require('../models/ideas');
const { getIdeas } = require('../utils/storage');

function checkIfIdeaIdMatches(ideaId) {
    let ideas = getIdeas();

    const idea = ideas.find((idea) => ideaId === idea.id);

    if (!idea) {
        throw new Error('Error. No idea with such ID found.');
    }

    return [ideas, idea];
}

function checkIfHeaderProvided(header) {
    if (!header) {
        throw new Error('Error. Please, check your header.');
    }
}

function checkIfDescriptionProvided(description) {
    if (!description) {
        throw new Error('Error. Please, check your description.');
    }
}

function checkIfAskedSumProvided(askedSum) {
    if (!askedSum) {
        throw new Error('Error. Please, check your asked sum.');
    }

    if (!Number.isInteger(askedSum)) {
        throw new Error('Sum should be a number.');
    }
}

function checkIfUserIdProvided(userId) {
    if (!userId) {
        throw new Error('Error. Please, check if you are logged in.');
    }
}

module.exports = {
    checkIfIdeaIdMatches,
    checkIfHeaderProvided,
    checkIfDescriptionProvided,
    checkIfAskedSumProvided,
    checkIfUserIdProvided,
};
