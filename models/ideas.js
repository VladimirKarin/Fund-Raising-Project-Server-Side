const { v4 } = require('uuid');
const { getIdeas, setIdeas } = require('../utils/storage.js');

function createIdea(header, description, askedSum, userId) {
    let ideas = getIdeas();

    const newIdea = {};
    newIdea.id = v4();
    newIdea.picture = './img/default_idea.png';
    newIdea.header = header;
    newIdea.description = description;
    newIdea.askedSum = askedSum;
    newIdea.userId = userId;
    newIdea.approve = 'pending';

    const newIdeas = [...ideas, newIdea];
    return setIdeas(newIdeas);
}

function updateIdea(ideaId, key, value) {
    let ideas = getIdeas();

    const idea = ideas.find((idea) => ideaId === idea.id);

    const updatedIdea = {
        ...idea,
        [key]: value,
    };

    function reduceFunction(previousValue, idea) {
        if (idea.id === ideaId) {
            return [...previousValue, updatedIdea];
        }
        return [...previousValue, idea];
    }

    const initialReduceValue = [];
    const updatedIdeas = ideas.reduce(reduceFunction, initialReduceValue);

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
