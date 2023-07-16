const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const loginRoute = require('./routes/login');
const ideasRoute = require('./routes/ideas');
const logoutRoute = require('./routes/logout');

const {
    login,
    registerUser,
    updateUser,
    findLoggedInUser,
} = require('./businessRules/users');

const { getUsers } = require('./utils/storage');
const { deleteUser, getUser } = require('./models/users');
const {
    getTotalSumDonatedForIdea,
    createDonationByUnregisteredUser,
    createDonationByRegisteredUser,
} = require('./businessRules/donations');
const bodyParser = require('body-parser');

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

app.use('/ideas', ideasRoute);

//USER METHODS
app.get('/users', (req, res) => {
    res.status(200).json(getUsers());
});

app.post('/users', (req, res) => {
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
    res.status(200).json(getTotalSumDonatedForIdea(req.body.ideaId));
});

app.post('/donations', (req, res) => {
    try {
        let user = getUser(req.body.userId);

        if (!user) {
            createDonationByUnregisteredUser(
                req.body.ideaId,
                req.body.firstName,
                req.body.sum
            );
        } else {
            createDonationByRegisteredUser(
                req.body.ideaId,
                req.body.userId,
                req.body.sum
            );
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
    res.status(200).send('Donation created successfully.');
});

//Login
app.use('/login', loginRoute);

//Logout
app.use('/logout', logoutRoute);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
