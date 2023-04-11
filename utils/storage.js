const fs = require('fs');

function setData(data, fileName) {
    fs.writeFileSync(`../data/${fileName}.json`, JSON.stringify(data), 'utf-8');
}

function getData(fileName) {
    const jsonData = fs.readFileSync(`./data/${fileName}.json`, 'utf-8');
    const jsData = JSON.parse(jsonData);
    return jsData;
}

function getUsers() {
    return getData('users');
}

function setUsers(users) {
    setData(users, 'users');
}

function getIdeas() {
    return getData('ideas');
}

function setIdeas(ideas) {
    setData(ideas, 'ideas');
}

function getDonations() {
    return getData('donations');
}

function setDonations(donations) {
    setData(donations, 'donations');
}

module.exports = {
    getUsers,
    setUsers,
    getIdeas,
    setIdeas,
    getDonations,
    setDonations,
};
