const { getIdeas } = require('../utils/storage');

function checkIfIdeaIdMatches(ideaId) {
    let ideas = getIdeas();

    const idea = ideas.find((idea) => ideaId === idea.id);

    if (!idea) {
        throw new Error('Error. No idea with such ID found.');
    }

    return [ideas, idea];
}

module.exports = {
    checkIfIdeaIdMatches,
};
