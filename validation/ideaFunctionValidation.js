const { getIdeas } = require('../utils/storage');

function ideaThatMatchesIdeaId(ideaId) {
    let ideas = getIdeas();

    const idea = ideas.find((idea) => ideaId === idea.id);

    if (!idea) {
        throw new Error('Error. No idea with such ID found.');
    }

    return [ideas, idea];
}

function isHeaderValid(header) {
    if (!header) {
        throw new Error('Error. Please, check your header.');
    }
}

function isDescriptionValid(description) {
    if (!description) {
        throw new Error('Error. Please, check your description.');
    }
}

function isAskedSumValid(askedSum) {
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
    ideaThatMatchesIdeaId,
    isHeaderValid,
    isDescriptionValid,
    isAskedSumValid,
    checkIfUserIdProvided,
};
