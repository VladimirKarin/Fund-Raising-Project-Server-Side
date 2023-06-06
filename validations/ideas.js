const { getAllIdeas } = require('../models/ideas');

function getIdea(ideaId) {
    let ideas = getAllIdeas();

    const idea = ideas.find((idea) => ideaId === idea.id);

    if (!idea) {
        throw new Error('Error. No idea with such ID found.');
    }

    return idea;
}

function validateIdea(ideaId) {
    let ideas = getAllIdeas();

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
        throw new Error('Sum should be a number.');
    }
}

function validateUserId(userId) {
    if (!userId) {
        throw new Error('Error. Please, check if you are logged in.');
    }
}

module.exports = {
    getIdea,
    validateIdea,
    validateHeader,
    validateDescription,
    validateAskedSum,
    validateUserId,
};