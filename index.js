const express = require('express');
const cors = require('cors');
const md5 = require('md5');
const cookieParser = require('cookie-parser');
const {
    login,
    registerUser,
    updateUser,
    logout,
    checkIfLoggedIn,
} = require('./businessRules/users');
const { getUsers } = require('./utils/storage');
const { deleteUser } = require('./models/users');
const {
    getIdeasTotalDonationSum,
    getIdeasSumDifference,
    createDonationByUnregisteredUser,
    createDonationByRegisteredUser,
} = require('./businessRules/donations.js');
const bodyParser = require('body-parser');
const { updateIdea, deleteIdea } = require('./models/ideas');
const {
    getIdeas,
    sortIdeasByDonationsSum,
    pendingIdeasList,
    approvedIdeasList,
    createIdea,
    updateIdeasStatus,
    rejectedIdeasList,
} = require('./businessRules/ideas');
const { findUser } = require('./validations/users');

const app = express();
const port = 3003;

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

// IDEAS METHODS

app.get('/ideas', (req, res) => {
    let sortedIdeasList;

    if (req.query.sortBy === 'all') {
        sortedIdeasList = getIdeas();
    } else if (req.query.sortBy === 'totalDonationSum') {
        sortedIdeasList = sortIdeasByDonationsSum();
    } else if (
        req.query.sortBy === 'status' &&
        req.query.status === 'accepted'
    ) {
        sortedIdeasList = approvedIdeasList();
    } else if (
        req.query.sortBy === 'status' &&
        req.query.status === 'pending'
    ) {
        sortedIdeasList = pendingIdeasList();
    } else if (
        req.query.sortBy === 'status' &&
        req.query.status === 'rejected'
    ) {
        sortedIdeasList = rejectedIdeasList();
    }

    res.status(200).json(sortedIdeasList);
});

app.post('/ideas', (req, res) => {
    try {
        createIdea(
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

app.put('/ideas', (req, res) => {
    try {
        updateIdea(req.body.ideaId, req.body.key, req.body.value);
    } catch (error) {
        res.status(404).send(error.message);
    }
    res.status(200).send('Idea updated successfully.');
});

app.put('/ideas/status', (req, res) => {
    try {
        updateIdeasStatus(req.body.ideaId, req.body.isApproved);
    } catch (error) {
        res.status(404).send(error.message);
    }
    res.status(200).send('Ideas status updated successfully.');
});

app.delete('/ideas', (req, res) => {
    try {
        deleteIdea(req.body.ideaId);
    } catch (error) {
        res.status(404).send(error.message);
    }

    res.status(200).send('Ideas successfully deleted.');
});

//USER METHODS
app.get('/users', (req, res) => {
    res.status(200).json(getUsers());
});

app.post('/users', (req, res) => {
    try {
        registerUser(
            req.body.userName,
            req.body.password,
            req.body.firstName,
            req.body.lastName
        );
    } catch (error) {
        res.status(400).send(error.message);
    }
    res.status(200).send('User created successfully.');
});

app.put('/users', (req, res) => {
    try {
        updateUser(req.body.userId, req.body.key, req.body.value);
    } catch (error) {
        res.status(400).send(error.message);
    }
    res.status(200).send('User successfully update.');
});

app.delete('/users', (req, res) => {
    try {
        deleteUser(req.body.userId);
    } catch (error) {
        res.status(400).send(error.message);
    }
    res.status(200).send('User successfully deleted.');
});

//DONATION METHODS

app.get('/donations', (req, res) => {
    res.status(200).json(getIdeasTotalDonationSum(req.body.ideaId));
});

app.get('/donations/sumDifference', (req, res) => {
    res.status(200).json(getIdeasSumDifference(req.body.ideaId));
});

app.post('/donations', (req, res) => {
    try {
        let searchResults = findUser(req.body.userId);
        let user = searchResults[1];

        if (!user) {
            createDonationByUnregisteredUser(
                req.body.firstName,
                req.body.sum,
                req.body.userId,
                req.body.ideaId
            );
        } else {
            createDonationByRegisteredUser(
                req.body.firstName,
                req.body.sum,
                req.body.userId,
                req.body.ideaId
            );
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
    res.status(200).send('Donation created successfully.');
});

//Login

app.post('/login', (req, res) => {
    try {
        const sessionId = login(req.body.userName, md5(req.body.password));

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

app.get('/login', (req, res) => {
    try {
        const user = checkIfLoggedIn(req.body.userLoginSession);
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

//Logout
app.post('/logout', (req, res) => {
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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
