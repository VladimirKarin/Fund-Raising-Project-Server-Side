const express = require('express');
const router = express.Router();
const { getUsers } = require('../utils/storage');
const { getUsersDonations } = require('../businessRules/donations');
const {
    registerUser,
    updateUser,
    checkIfAdmin,
} = require('../businessRules/users');
const { deleteUser } = require('../models/users');

const isAdmin = (req, res, next) => {
    const userLoginSession = req.query.userLoginSession;

    if (!userLoginSession) {
        res.status(403).send(
            'Access Forbidden. User Login Session not provided.'
        );
        return;
    }

    if (checkIfAdmin(userLoginSession)) {
        next();
    } else {
        res.status(403).send(
            'Access Forbidden. Only Admin has the right to see the users list.'
        );
    }
};

router.get('/', isAdmin, (_, res) => {
    res.status(200).json(getUsers());
});

router.get('/donations', (req, res) => {
    try {
        const userId = req.query.userId;
        const donations = getUsersDonations(userId);
        res.json(donations);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/', (req, res) => {
    try {
        registerUser(
            req.body.username,
            req.body.password,
            req.body.firstName,
            req.body.lastName
        );
    } catch (error) {
        res.status(400).send(error.message);
    }
    res.status(200).send('User created successfully.');
});

router.put('/', (req, res) => {
    try {
        const { userId, key, value } = req.body;
        updateUser(userId, key, value);
        res.status(200).send('User successfully updated.');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete('/:userId', (req, res) => {
    try {
        deleteUser(req.params.userId);
        res.status(200).send('User successfully deleted.');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
