const { getAllIdeas } = require('../models/ideas');

function getIdeas() {
    return getAllIdeas();
}

module.exports = {
    getIdeas,
};
