const express = require('express');
const router = express.Router();
const { logout } = require('../businessRules/users');

router.post('/', (req, res) => {
    try {
        logout(req.body.userLoginSession);

        res.clearCookie('userLoginSession', {
            sameSite: 'None',
            secure: true,
            httpOnly: true,
            sameSite: 'None',
        });
    } catch (error) {
        res.status(404).send(error.message);
    }
    res.status(200).send('You have successfully logged out.');
});

module.exports = router;
