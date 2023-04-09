const { getIdeas, setIdeas } = require('./utils/storage.js');

function deleteIdea(ideaId) {
    let ideas = getIdeas();

    let ideaToDelete = ideas.filter(idea => ideaId !== idea.id);

    setIdeas(ideaToDelete);
}

module.exports = {
    deleteIdea
}