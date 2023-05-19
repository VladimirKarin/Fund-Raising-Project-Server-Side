const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { getIdeas } = require('./businessRules/ideas');
const { login, registerUser } = require('./businessRules/users');
const { getUsers } = require('./utils/storage');

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

//Login

app.post('/login', (req, res) => {
    login(req, res);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
