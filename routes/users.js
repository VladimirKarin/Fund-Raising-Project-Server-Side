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

router.get('/', (req, res) => {
    if (req.body.userLoginSession) {
        if (checkIfAdmin(req.body.userLoginSession)) {
            res.status(200).json(getUsers());
        } else {
            res.status(403).send(
                'Access Forbidden. Only Admin has the right to see the users list.'
            );
        }
    } else {
        res.status(403).send(
            'Access Forbidden. Only Admin has the right to see the users list.'
        );
    }
});

router.get('/donations', (req, res) => {
    try {
        res.status(200).json(getUsersDonations(req.query.userId));
    } catch (error) {
        res.status(400).send(error.message);
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
        updateUser(req.body.userId, req.body.key, req.body.value);
    } catch (error) {
        res.status(400).send(error.message);
    }
    res.status(200).send('User successfully update.');
});

router.delete('/:userId', (req, res) => {
    try {
        deleteUser(req.params.userId);
    } catch (error) {
        res.status(400).send(error.message);
    }
    res.status(200).send('User successfully deleted.');
});

module.exports = router;
