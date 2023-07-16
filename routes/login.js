const express = require('express');
const router = express.Router();
const md5 = require('md5');
const { login, findLoggedInUser } = require('../businessRules/users');

router.post('/', (req, res) => {
    try {
        const sessionId = login(req.body.username, md5(req.body.password));

        res.cookie('userLoginSession', sessionId, {
            sameSite: 'None',
            secure: true,
            httpOnly: true,
            maxAge: 900000,
        });
    } catch (error) {
        res.status(400).send(error.message);
    }

    res.status(200).send('Successfully logged in.');
});

router.get('/', (req, res) => {
    try {
        const user = findLoggedInUser(req.query.userLoginSession);
        res.status(200).json({
            status: 'OK',
            message: 'You are Logged in.',
            name: user.firstName,
            role: user.role,
        });
    } catch (error) {
        res.status(404).send(error.message);
    }
});

module.exports = router;
