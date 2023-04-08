const fs = require('fs');

function getUsers() {
    const jsonData = fs.readFileSync('./data/users.json', 'utf-8');
    const jsData = JSON.parse(jsonData);
    return jsData;
}

function setUsers(users) {
    fs.writeFileSync('./data/users.json', JSON.stringify(users), 'utf-8');
}

function getIdeas() {
    const jsonData = fs.readFileSync('./data/ideas.json', 'utf-8');
    const jsData = JSON.parse(jsonData);
    return jsData;
}

function setIdeas(ideas) {
    fs.writeFileSync('./data/ideas.json', JSON.stringify(ideas), 'utf-8');
}

function getDonations() {
    const jsonData = fs.readFileSync('./data/donations.json', 'utf-8');
    const jsData = JSON.parse(jsonData);
    return jsData;
}

function setDonations(donations) {
    fs.writeFileSync('./data/donations.json', JSON.stringify(donations), 'utf-8');
}


module.exports = {
    getUsers,
    setUsers,
    getIdeas,
    setIdeas,
    getDonations,
    setDonations,
}