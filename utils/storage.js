const fs = require('fs');

function setData(data) {
    fs.writeFileSync(`./data/${data}.json`, JSON.stringify(data), 'utf-8');
}

function getUsers() {
    const jsonData = fs.readFileSync('./data/users.json', 'utf-8');
    const jsData = JSON.parse(jsonData);
    return jsData;
}

function setUsers(users) {
    setData(users);
}

function getIdeas() {
    const jsonData = fs.readFileSync('./data/ideas.json', 'utf-8');
    const jsData = JSON.parse(jsonData);
    return jsData;
}

function setIdeas(ideas) {
    setData(ideas);
}

function getDonations() {
    const jsonData = fs.readFileSync('./data/donations.json', 'utf-8');
    const jsData = JSON.parse(jsonData);
    return jsData;
}

function setDonations(donations) {
    setData(donations);
}


module.exports = {
    getUsers,
    setUsers,
    getIdeas,
    setIdeas,
    getDonations,
    setDonations,
}