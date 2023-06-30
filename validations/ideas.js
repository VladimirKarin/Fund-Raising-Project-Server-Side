const { getIdeas } = require('../models/ideas');

function validateIdea(ideaId) {
    let ideas = getIdeas();

    const idea = ideas.find((idea) => ideaId === idea.id);

    if (!idea) {
        throw new Error('Error. No idea with such ID found.');
    }
}

function validateHeader(header) {
    if (!header) {
        throw new Error('Error. Please, check your header.');
    }
}

function validateDescription(description) {
    if (!description) {
        throw new Error('Error. Please, check your description.');
    }
}

function validateAskedSum(askedSum) {
    if (!askedSum) {
        throw new Error('Error. Please, check your asked sum.');
    }
    if (!Number.isInteger(askedSum)) {
        throw new Error('Asked sum should be a number.');
    }
}

module.exports = {
    validateHeader,
    validateIdea,
    validateDescription,
    validateAskedSum,
};
