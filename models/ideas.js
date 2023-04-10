const { v4 } = require('uuid');
const { getIdeas, setIdeas } = require('./utils/storage.js');
const { getIdeas, setIdeas } = require('./ideas.js');

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

function updateIdea(ideaId, idea) {
    let ideas = getIdeas();
    const idea = idea;

    const updateIdeas = ideas.reduse((updateIdeas, idea) => {
        if (idea.id === ideaId) {
            return [...updateIdeas, updateIdea];
        }
        return [...updateIdeas, idea];
    }, []);
    setIdeas(updateIdeas);
}

function deleteIdea(ideaId) {
    let ideas = getIdeas();

    let updatedIdeas = ideas.filter((idea) => ideaId !== idea.id);

    setIdeas(updatedIdeas);
}

module.exports = {
    createIdea,
    updateIdea,
    deleteIdea
};
