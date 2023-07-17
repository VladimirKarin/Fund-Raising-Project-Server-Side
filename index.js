const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const donationsRoute = require('./routes/donations');
const loginRoute = require('./routes/login');
const logoutRoute = require('./routes/logout');
const usersRoute = require('./routes/users');
const { login, logout, findLoggedInUser } = require('./businessRules/users');
const { getUser } = require('./models/users');

const {
    login,
    registerUser,
    updateUser,
    findLoggedInUser,
} = require('./businessRules/users');
const { getUsers, getIdeas: getIdeasUtil } = require('./utils/storage');
const { deleteUser } = require('./models/users');

const bodyParser = require('body-parser');
const { updateIdea, deleteIdea, getIdeas } = require('./models/ideas');
const {
    sortIdeasByTotalDonationSum,
    getPendingIdeas,
    getApprovedIdeas,
    createNewIdea,
    updateIdeasStatus,
    getRejectedIdeas,
} = require('./businessRules/ideas');

const app = express();
const port = process.env.PORT || 3003;
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

app.post('/ideas', (req, res) => {
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
app.use('/users', usersRoute);

//DONATION METHODS

app.use('/donations', donationsRoute);

//Login
app.use('/login', loginRoute);

//Logout
app.use('/logout', logoutRoute);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
