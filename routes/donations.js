const express = require('express');
const {
    getDonationsForIdea,
    getTotalSumDonatedForIdea,
    createDonationByUnregisteredUser,
    createDonationByRegisteredUser,
} = require('../businessRules/donations');
const { getUser } = require('../models/users');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json(getDonationsForIdea(req.query.ideaId));
});

router.get('/total', (req, res) => {
    res.status(200).json(getTotalSumDonatedForIdea(req.query.ideaId));
});

router.post('/', (req, res) => {
    try {
        let user = getUser(req.body.userId);

        if (!user) {
            createDonationByUnregisteredUser(
                req.body.ideaId,
                req.body.firstName,
                req.body.sum
            );
        } else {
            createDonationByRegisteredUser(
                req.body.ideaId,
                req.body.userId,
                req.body.sum
            );
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
    res.status(200).send('Donation created successfully.');
});

module.exports = router;
