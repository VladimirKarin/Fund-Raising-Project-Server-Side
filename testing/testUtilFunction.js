/* Testing App */
const {
    createDonationByUnregisteredUser,
    createDonationByRegisteredUser,
    getIdeasTotalDonationSum,
    getIdeasSumDifference,
} = require('../businessRules/donations');
const {
    getIdeas,
    sortIdeasByDonationsSum,
    createIdea,
    updateIdeasStatus,
    pendingIdeasList,
    approvedIdeasList,
    rejectedIdeasList,
} = require('../businessRules/ideas');
const {
    registerUser,
    login,
    logout,
    updateUser,
    deleteUser,
    checkIfLoggedIn,
} = require('../businessRules/users');
const { createDonation } = require('../models/donations');
const { updateIdea } = require('../models/ideas');
const { getAllIdeas } = require('../models/ideas');
const { deleteIdea } = require('../models/ideas');
const { create } = require('../models/ideas');
const { createUser } = require('../models/users');
const { findIdeaWithTotalDonationSum } = require('../validations/donations');
const { findIdea } = require('../validations/ideas');
/*
// Create User (models)
createUser();

// Delete User (models)
deleteUser();

// Create Idea(models)
createIdea(
    'Funky Header',
    'Funky Description',
    500,
    '1970becf-4aeb-4b79-954b-fb318949cb53'
    );

// Update Idea (models)
updateIdea(
        '337b36b6-6f6b-4d5f-93e3-e7d0777393dd',
        'description',
        'Rocking Description'
        );

// Delete Idea (models)
deleteIdea('337b36b6-6f6b-4d5f-93e3-e7d0777393dd');

//Get All Ideas (models)
console.log(getAllIdeas());

//Create Donation (models)
createDonation(
    'Bobba',
    25,
    'd6e15668-dcc1-49e6-9343-4972d100f329',
    '6ae1ea20-6e79-45f8-8265-eba8a3d22677'
);
// Register User (businessRules)
console.log('Test 1. No userName.');
registerUser(null, '123', 'Vladimir', 'Karin');
console.log('Test 2. No password.');
registerUser('VKarin2', null, 'Vladimir', 'Karin');
console.log('Test 3. No firstName.');
registerUser('VKarin3', '123', null, 'Karin');
console.log('Test 4. No lastName');
registerUser('VKarin4', '123', 'Vladimir', null);
console.log('Test 5. All data.');
registerUser('VKarin5', '123', 'Vladimir', 'Karin');

// Login User (businessRules)
console.log('Test 1. No userName.');
login(null, '123');
console.log('Test 2. No password.');
login('VKarin5', null);
console.log('Test 3. Wrong password.');
login('VKarin5', '126');
console.log('Test 4. All data.');
login('VKarin4', '202cb962ac59075b964b07152d234b70');

// Logout User (businessRules)
console.log('Test 1. No Login Session.');
logout(null);
console.log('Test 1. All data.');
logout('149e75f467f44baa057cc25afc954dff');

//Update User (businessRules)
console.log('Test 1. No Id.');
updateUser(null, 'firstName', 'Vovchik');
console.log('Test 2. No key.');
updateUser('a5b42c95-2315-4175-871c-cc4c110d1dea', null, 'Vovchik');
console.log('Test 3. No value.');
updateUser('a5b42c95-2315-4175-871c-cc4c110d1dea', 'firstName', undefined);
console.log('Test 4. All data.');
updateUser('a5b42c95-2315-4175-871c-cc4c110d1dea', 'firstName', 'Vovchik');

//Delete User (businessRules)
console.log('Test 1. No Id.');
deleteUser(null);
console.log('Test 2. All data.');
deleteUser('a5b42c95-2315-4175-871c-cc4c110d1dea');

console.log('Test 1. No login session');
checkIfLoggedIn(null);
console.log('Test 2. Wrong login session');
checkIfLoggedIn('4074df08bb38afda47c375bd8667dfss');
console.log('Test 1. Correct login session');
console.log(checkIfLoggedIn('4074df08bb38afda47c375bd8667dfd8'));

//Get Ideas (businessRules)
console.log(getIdeas());

//Sorted by donation sum ideas (businessRules)
console.log(sortIdeasByDonationsSum());

// Create Idea (businessRules)
console.log('Test 1. No header. ');
createIdea(
    null,
    'Descriptive description',
    750,
    '26877c11-30ac-4f93-8a89-8136c3ddb2e4'
    );
    
console.log('Test 2. No description. ');
createIdea(
    'Headering header',
    null,
    750,
    '26877c11-30ac-4f93-8a89-8136c3ddb2e4'
    );
        
console.log('Test 3. Asked Sum not a number. ');
createIdea(
    'Headering header',
    'Descriptive description',
    '750',
    '26877c11-30ac-4f93-8a89-8136c3ddb2e4'
    );
            
console.log('Test 4. No asked sum. ');
createIdea(
    'Headering header',
    'Descriptive description',
    null,
    '26877c11-30ac-4f93-8a89-8136c3ddb2e4'
    );
                
console.log('Test 5. No user ID. ');
createIdea('Headering header', 'Descriptive description', 750, null);
                
console.log('Test 6. All data. ');
createIdea(
    'Headering header',
    'Descriptive description',
    750,
    '26877c11-30ac-4f93-8a89-8136c3ddb2e4'
);


//Update Ideas Status (business Rules)
console.log('Test 1. No Idea Id.');
updateIdeasStatus(null, true);

console.log('Test 2. No status.');
updateIdeasStatus('99566354-2870-4003-b399-bd7e65eeed9a', undefined);

console.log('Test 3. All data (true).');
updateIdeasStatus('99566354-2870-4003-b399-bd7e65eeed9a', true);

console.log('Test 4. All data (false).');
updateIdeasStatus('99566354-2870-4003-b399-bd7e65eeed9a', false);

// Pending ideas list
console.log(pendingIdeasList());

// Approved ideas list
console.log(approvedIdeasList());

// Rejected ideas list
console.log(rejectedIdeasList());


// Create Donation by unregistered user

console.log('Test 1. No sum');
createDonationByUnregisteredUser(
    null,
    '26877c11-30ac-4f93-8a89-8136c3ddb2e4',
    '99566354-2870-4003-b399-bd7e65eeed9a'
);

console.log('Test 2. No users ID');
createDonationByUnregisteredUser(
    25,
    null,
    '99566354-2870-4003-b399-bd7e65eeed9a'
);

console.log('Test 3. No Ideas ID');
createDonationByUnregisteredUser(
    25,
    '26877c11-30ac-4f93-8a89-8136c3ddb2e4',
    null
);

console.log('Test 4. All data');
createDonationByUnregisteredUser(
    25,
    '26877c11-30ac-4f93-8a89-8136c3ddb2e4',
    '99566354-2870-4003-b399-bd7e65eeed9a'
);

// Create Donation by registered user

console.log('Test 1. No sum');
createDonationByRegisteredUser(
    null,
    '26877c11-30ac-4f93-8a89-8136c3ddb2e4',
    '99566354-2870-4003-b399-bd7e65eeed9a'
);

console.log('Test 2. No users ID');
createDonationByRegisteredUser(
    25,
    null,
    '99566354-2870-4003-b399-bd7e65eeed9a'
);

console.log('Test 3. No Ideas ID');
createDonationByRegisteredUser(
    25,
    '26877c11-30ac-4f93-8a89-8136c3ddb2e4',
    null
);

console.log('Test 4. All data');
createDonationByRegisteredUser(
    25,
    '26877c11-30ac-4f93-8a89-8136c3ddb2e4',
    '99566354-2870-4003-b399-bd7e65eeed9a'
);

// Get Ideas total donation sum

console.log(getIdeasTotalDonationSum('99566354-2870-4003-b399-bd7e65eeed9a'));


//Get Ideas sum difference

console.log(getIdeasSumDifference('99566354-2870-4003-b399-bd7e65eeed9a'));
*/

createDonationByUnregisteredUser(
    '6ae1ea20-6e79-45f8-8265-eba8a3d22677',
    undefined,
    5
);
