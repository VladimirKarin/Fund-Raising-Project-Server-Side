const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { updateIdea, deleteIdea } = require('./models/ideas');
const {
    getIdeas,
    sortedByDonationSumIdeas,
    pendingIdeasList,
    approvedIdeasList,
    createIdeas,
    ideasStatusApproval,
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

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

// IDEAS METHODS

app.get('/ideas', (req, res) => {
    res.status(200).json(getIdeas());
});

app.get('/ideas/sort/byDonationSum', (req, res) => {
    res.status(200).json(sortedByDonationSumIdeas());
});

app.get('/ideas', (req, res) => {
    res.status(200).json(pendingIdeasList());
});

app.get('/ideas', (req, res) => {
    res.status(200).json(approvedIdeasList());
});

app.post('/ideas', (req, res) => {
    try {
        createIdeas(
            req.body.header,
            req.body.description,
            req.body.askedSum,
            req.body.userId
        );
    } catch (Error) {
        res.status(400).send(Error.message);
    }
    res.status(200).send('Idea created successfully.');
});

app.put('/ideas', (req, res) => {
    try {
        updateIdea(req.body.ideaId, req.body.key, req.body.value);
    } catch (Error) {
        res.status(404).send(Error.message);
    }
    res.status(200).send('Idea updated successfully.');
});

app.put('/ideas/status', (req, res) => {
    try {
        ideasStatusApproval(req.body.ideaId, req.body.isApproved);
    } catch (Error) {
        res.status(404).send(Error.message);
    }
    res.status(200).send('Ideas status updated successfully.');
});

app.delete('/ideas', (req, res) => {
    try {
        deleteIdea(req.body.ideaId);
    } catch (Error) {
        res.status(404).send(Error.message);
    }

    res.status(200).send('Ideas successfully deleted');
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
