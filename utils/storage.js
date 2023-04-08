const fs = require('fs');

function getUsers() {
    const jsonData = fs.readFileSync('./data/users.json', 'utf-8');
    const jsData = JSON.parse(jsonData);
    return jsData;
}

function getIdeas() {
    const jsonData = fs.readFileSync('./data/ideas.json', 'utf-8');
    const jsData = JSON.parse(jsonData);
    return jsData;
}

function getDonations() {
    const jsonData = fs.readFileSync('./data/donations.json', 'utf-8');
    const jsData = JSON.parse(jsonData);
    return jsData;
}

module.exports = {
    getUsers,
    getIdeas,
    getDonations,
}