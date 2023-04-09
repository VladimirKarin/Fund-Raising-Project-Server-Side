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

module.exports = {
    createIdea

}
