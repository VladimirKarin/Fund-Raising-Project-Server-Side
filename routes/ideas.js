const express = require('express');
const router = express.Router();
const {
    sortIdeasByTotalDonationSum,
    getPendingIdeas,
    getApprovedIdeas,
    createNewIdea,
    updateIdeasStatus,
    getRejectedIdeas,
} = require('../businessRules/ideas');
const { getIdeas, updateIdea, deleteIdea } = require('../models/ideas');

router.get('/', (req, res) => {
    let sortedIdeas = getIdeas();

    if (req.query.sortBy === 'totalDonationSum') {
        sortedIdeas = sortIdeasByTotalDonationSum(ideas);
    } else if (
        req.query.sortBy === 'status' &&
        req.query.status === 'accepted'
    ) {
        sortedIdeas = getApprovedIdeas();
    } else if (
        req.query.sortBy === 'status' &&
        req.query.status === 'pending'
    ) {
        sortedIdeas = getPendingIdeas();
    } else if (
        req.query.sortBy === 'status' &&
        req.query.status === 'rejected'
    ) {
        sortedIdeas = getRejectedIdeas();
    }

    res.status(200).json(sortedIdeas);
});

router.post('/', (req, res) => {
    try {
        createNewIdea(
            req.body.header,
            req.body.description,
            req.body.askedSum,
            req.body.userId
        );
    } catch (error) {
        res.status(400).send(error.message);
    }
    res.status(200).send('Idea created successfully.');
});

router.put('/', (req, res) => {
    try {
        updateIdea(req.body.ideaId, req.body.key, req.body.value);
    } catch (error) {
        res.status(404).send(error.message);
    }
    res.status(200).send('Idea updated successfully.');
});

router.put('/status', (req, res) => {
    try {
        updateIdeasStatus(req.body.ideaId, req.body.isApproved);
    } catch (error) {
        res.status(404).send(error.message);
    }
    res.status(200).send('Ideas status updated successfully.');
});

router.delete('/', (req, res) => {
    try {
        deleteIdea(req.body.ideaId);
    } catch (error) {
        res.status(404).send(error.message);
    }

    res.status(200).send('Ideas successfully deleted.');
});

module.exports = router;
