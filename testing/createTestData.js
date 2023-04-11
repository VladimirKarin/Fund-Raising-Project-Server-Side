const { createUser } = require('../models/users');
const { createIdea } = require('../models/ideas');
const { createDonation } = require('../models/donations');

function createTestData() {
    const userId = createUser(
        'DVader',
        'd9b1d7db4cd6e70935368a1efb10e377',
        'Darth',
        'Vader'
    );

    const ideaId1 = createIdea('Idea 1', 'Idea 1 Description 1 ', 100, userId);
    const ideaId2 = createIdea('Idea 2', 'Idea 2 Description 2 ', 100, userId);
    createIdea('Idea 3', 'Idea 3 Description 3 ', 100, userId);

    createDonation('Darth', 20, ideaId1, userId);
    createDonation('Darth', 10, ideaId1, userId);
    createDonation('Darth', 5, ideaId1, userId);
    createDonation('Darth', 20, ideaId2, userId);
    createDonation('Darth', 10, ideaId2, userId);
}
createTestData();
