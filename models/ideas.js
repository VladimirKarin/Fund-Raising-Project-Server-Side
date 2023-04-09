const { v4 } = require('uuid');
const { getIdeas, setIdeas } = require('./utils/storage.js');

function createIdea(header, description, askedSum, userId) {
    const newIdea = {};
    newIdea.id = v4();
    newIdea.picture = './img/default_idea.png';
    newIdea.header = header;
    newIdea.description = description;
    newIdea.askedSum = askedSum;
    newIdea.userId = userId;
    newIdea.approve = 'pending';

    return newUser;
}

function deleteIdea(ideaId) {
    let ideas = getIdeas();

    let updatedIdeas = ideas.filter((idea) => ideaId !== idea.id);

    setIdeas(updatedIdeas);
}

module.exports = {
    createIdea,
    deleteIdea,
};
