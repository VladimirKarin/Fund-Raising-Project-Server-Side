const { v4 } = require('uuid');
const { getIdeas, setIdeas } = require('../utils/storage.js');

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

function updateIdea(ideaId, key, value) {
    let ideas = getIdeas();
    console.log(ideas);

    const idea = ideas.find((idea) => ideaId === idea.id);

    idea[key] = value;
    const updatedIdea = {
        ...idea,
    };

    const updatedIdeas = ideas.reduce((updatedIdeas, idea) => {
        if (idea.id === ideaId) {
            return [...updatedIdeas, updatedIdea];
        }
        return [updatedIdeas, idea];
    });
    setIdeas(updatedIdeas);
}

function deleteIdea(ideaId) {
    let ideas = getIdeas();

    let updatedIdeas = ideas.filter((idea) => ideaId !== idea.id);

    setIdeas(updatedIdeas);
}

module.exports = {
    createIdea,
    updateIdea,
    deleteIdea,
};
