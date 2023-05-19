const { v4 } = require('uuid');
const { getIdeas, setIdeas, getDonations } = require('../utils/storage');

function createIdea(header, description, askedSum, userId) {
    let ideas = getIdeas();

    const newIdea = {};
    newIdea.id = v4();
    newIdea.picture = './img/default_idea.png';
    newIdea.header = header;
    newIdea.description = description;
    newIdea.askedSum = askedSum;
    newIdea.userId = userId;
    newIdea.status = 'pending';

    const newIdeas = [...ideas, newIdea];
    setIdeas(newIdeas);
    return newIdea.id;
}

function updateIdea(ideaId, key, value) {
    if (!value) {
        throw new Error(`Error. You didn't provide any value to update`);
    }

    let ideas = getIdeas();

    const idea = ideas.find((idea) => ideaId === idea.id);

    if (!idea) {
        throw new Error(`Error. No idea with such ID found.`);
    }

    const updatedIdea = {
        ...idea,
        [key]: value,
    };

    function reduceFunction(previousValue, idea) {
        if (idea.id === ideaId) {
            return [...previousValue, updatedIdea];
        }
        return [...previousValue, idea];
    }

    const initialReduceValue = [];
    const updatedIdeas = ideas.reduce(reduceFunction, initialReduceValue);

    setIdeas(updatedIdeas);
}

function deleteIdea(ideaId) {
    let ideas = getIdeas();

    const idea = ideas.find((idea) => ideaId === idea.id);

    if (!idea) {
        throw new Error(`Error. No idea with such ID found.`);
    }

    let updatedIdeas = ideas.filter((idea) => ideaId !== idea.id);

    setIdeas(updatedIdeas);
}

function getAllIdeas() {
    const ideas = getIdeas(); //Get all ideas
    const donations = getDonations(); //Get all donation

    const ideasWithDonations = ideas.reduce((updatedIdeas, idea) => {
        // Transforming ideas without donations to ideas with donations.

        const donationsForThisIdea = donations.filter((donation) => {
            // console.log(donation);
            // console.log(idea.id);
            return donation.ideaId === idea.id; //filtering donations for the certain idea.
        });
        // console.log(donationsForThisIdea);

        const totalDonationSum = donationsForThisIdea.reduce(
            //Transforming donation list (with different sums) to donation list with one sum, for certain idea.
            (totalSum, currentDonation) => {
                return totalSum + currentDonation.sum;
            },
            0
        );
        // console.log(totalDonationSum);

        const updatedIdea = {
            //Updating idea object with idea, all the donations for this idea and total sum of those donations.
            ...idea,
            donations: donationsForThisIdea,
            totalDonationSum,
        };

        return [...updatedIdeas, updatedIdea]; //updating idea list, by adding new updated idea.
    }, []);
    // console.log(ideasWithDonations);
    return ideasWithDonations;
}

module.exports = {
    createIdea,
    updateIdea,
    deleteIdea,
    getAllIdeas,
};
