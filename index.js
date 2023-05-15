const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const {
    getIdeas,
    sortedByDonationSumIdeas,
    pendingIdeasList,
    approvedIdeasList,
    createIdeas,
} = require('./businessRules/ideas');
const { login } = require('./businessRules/users');

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

app.get('/ideas/sorted/donationSum', (req, res) => {
    res.status(200).json(sortedByDonationSumIdeas());
});

app.get('/ideas/sorted/pendingStatus', (req, res) => {
    res.status(200).json(pendingIdeasList());
});

app.get('/ideas/sorted/approvedStatus', (req, res) => {
    res.status(200).json(approvedIdeasList());
});

app.post('/ideas/', (req, res) => {
    res.status(200)
        .json(
            createIdeas(
                req.body.header,
                req.body.description,
                req.body.askedSum,
                req.body.userId
            )
        )
        .send('Idea created successfully.');
});

//Login

app.post('/login', (req, res) => {
    login(req, res);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
