const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');

const donationsRoute = require('./routes/donations');
const ideasRoute = require('./routes/ideas');
const loginRoute = require('./routes/login');
const logoutRoute = require('./routes/logout');
const usersRoute = require('./routes/users');

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
