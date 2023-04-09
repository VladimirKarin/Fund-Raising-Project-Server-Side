const { getIdeas, setIdeas } = require('./utils/storage.js');

function deleteIdea(ideaId) {
    let ideas = getIdeas();

    let updatedIdeas = ideas.filter(idea => ideaId !== idea.id);

    setIdeas(updatedIdeas);
}

module.exports = {
    deleteIdea
}