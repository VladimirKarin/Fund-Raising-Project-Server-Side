const { v4 } = require('uuid');

function createDonation(firstName, sum, userId, ideaId) {
    const newDonation = {};
    newDonation.id = v4();
    newDonation.firstName = firstName;
    newDonation.sum = sum;
    newDonation.userId = userId;
    newDonation.ideaId = ideaId;

    return newDonation;
}

module.exports = {
    createDonation
}