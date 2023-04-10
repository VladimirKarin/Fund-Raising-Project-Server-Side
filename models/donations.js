const { v4 } = require('uuid');
const { getDonations, setDonations } = require('../utils/storage');

function createDonation(firstName, sum, userId, ideaId) {
    const newDonation = {};
    let donations = getDonations();

    newDonation.id = v4();
    newDonation.firstName = firstName;
    newDonation.sum = sum;
    newDonation.userId = userId;
    newDonation.ideaId = ideaId;

    const newDonations = [...donations, newDonation];
    return setDonations(newDonations);
}

module.exports = {
    createDonation,
};
