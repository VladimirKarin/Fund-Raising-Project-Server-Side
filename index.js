const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { updateIdea, deleteIdea } = require('./models/ideas');
const {
    getIdeas,
    sortedByDonationSumIdeas,
    pendingIdeasList,
    approvedIdeasList,
    createIdeas,
    updateIdeasStatus,
    rejectedIdeasList,
} = require('./businessRules/ideas');
const { login, logout, checkIfLoggedIn } = require('./businessRules/users');

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
        sortedIdeasList = sortedByDonationSumIdeas();
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

    try {
        res.status(200).json(sortedIdeasList);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.post('/ideas', (req, res) => {
    try {
        createIdeas(
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

//Login

app.post('/login', (req, res) => {
    res.status(200).json(login(req, res));
});

app.get('/login', (req, res) => {
    checkIfLoggedIn(req, res);
});

//Logout
app.post('/logout', (req, res) => {
    logout(req, res);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
