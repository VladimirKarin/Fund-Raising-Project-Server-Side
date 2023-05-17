const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { getIdeas } = require('./businessRules/ideas');
const { login } = require('./businessRules/users');
const {
    ideasDonationSum,
    ideasSumDifference,
    createDonationsWithDataValidation,
} = require('./businessRules/donations');

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
    // access-control-allow-credentials:true
};
app.use(cors(corsOptions));

app.use(express.json());

// IDEAS METHODS

app.get('/ideas', (req, res) => {
    res.status(200).json(getIdeas());
});

//DONATION METHODS

app.get('/donations', (req, res) => {
    res.status(200).json(ideasDonationSum(req.body.ideaId));
});

app.get('/donations/sumDifference', (req, res) => {
    res.status(200).json(ideasSumDifference(req.body.ideaId));
});

app.post('/donations', (req, res) => {
    try {
        createDonationsWithDataValidation(
            req.body.firstName,
            req.body.sum,
            req.body.userId,
            req.body.ideaId
        );
    } catch (Error) {
        res.status(404).send(Error.message);
    }
    res.status(200).send('Donation created successfully');
});

//Login

app.post('/login', (req, res) => {
    login(req, res);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
