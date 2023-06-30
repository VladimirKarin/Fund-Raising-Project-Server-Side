const { v4 } = require('uuid');
const { getDonations, setDonations } = require('../utils/storage');

function createDonation(ideaId, userId, sum) {
    const newDonation = {};
    let donations = getDonations();

    newDonation.id = v4();
    newDonation.sum = sum;
    newDonation.userId = userId;
    newDonation.ideaId = ideaId;

    const newDonations = [...donations, newDonation];
    setDonations(newDonations);
}

module.exports = {
    createDonation,
};
