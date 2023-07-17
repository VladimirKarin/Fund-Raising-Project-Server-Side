/* Testing App */
const {
    createDonationByUnregisteredUser,
    createDonationByRegisteredUser,
    getTotalSumDonatedForIdea,
    getDonationsForIdea,
    getUsersDonations,
} = require('../businessRules/donations');
const {
    createIdea,
    updateIdeasStatus,
    pendingIdeasList,
    approvedIdeasList,
    rejectedIdeasList,
    sortIdeasByTotalDonationSum,
} = require('../businessRules/ideas');
const {
    registerUser,
    login,
    logout,
    updateUser,
    deleteUser,
    checkIfLoggedIn,
    findRegisteredUser,
} = require('../businessRules/users');
const { createDonation } = require('../models/donations');
const { updateIdea, createNewIdea } = require('../models/ideas');
const { getAllIdeas } = require('../models/ideas');
const { deleteIdea } = require('../models/ideas');
const { createUser } = require('../models/users');
const {
    validateHeader,
    validateAskedSum,
    validateDescription,
} = require('../validations/ideas');
const { validateUserId } = require('../validations/users');
/*
// Create User (models)
createUser('NewUser', '123', 'New', 'User');

// Delete User (models)
deleteUser('e601cb0e-e7fa-4d95-b30d-44404476525b');

validateHeader(null);
validateAskedSum('500');
validateDescription(null);
validateUserId(null);

//Create Idea(models)i
console.log('Test 1. No header.');
createIdea(
    null,
    'Freaking Description',
    1500,
    '1970becf-4aeb-4b79-954b-fb318949cb53'
);

console.log('Test 2. No description.');
createIdea(
    'Freaking Header 999',
    null,
    1500,
    '1970becf-4aeb-4b79-954b-fb318949cb53'
);

console.log('Test 3. No askedSum.');
createIdea(
    'Freaking Header 999',
    'Freaking Description999',
    null,
    '1970becf-4aeb-4b79-954b-fb318949cb53'
);

console.log('Test 4. AskesSum not a number.');
createIdea(
    'Freaking Header 999',
    'Freaking Description999',
    '500',
    '1970becf-4aeb-4b79-954b-fb318949cb53'
);

console.log('Test 5. No UserId.');
createIdea('Freaking Header 999', 'Freaking Description999', 500, null);

console.log('Test 6. All data.');
createIdea(
    'Freaking Header 999',
    'Freaking Description',
    1500,
    '1970becf-4aeb-4b79-954b-fb318949cb53'
);

//Update Idea (models)
updateIdea(
    '5aaf7249-62f1-4bd0-88db-4a3b8ea8a309',
    'header',
    'Best Description Ever'
);

// Delete Idea (models)
deleteIdea('5aaf7249-62f1-4bd0-88db-4a3b8ea8a309');

//Get All Ideas (models)
console.log(getAllIdeas());

//Create Donation (models)
console.log('Test 1. No idea id.');
createDonation(
    'e735898a-b6e7-48a0-b3bc-5064972cc5e3',
    '64d896f0-8dd9-4439-a713-214f46198382',
    50
);

console.log('Test 2. No user id.');
createDonation('e735898a-b6e7-48a0-b3bc-5064972cc5e3', null, '50');

console.log('Test 3. No sum.');
createDonation(
    'e735898a-b6e7-48a0-b3bc-5064972cc5e3',
    '64d896f0-8dd9-4439-a713-214f46198382',
    null
);

console.log('Test 4. Sum is not a number.');
createDonation(
    'e735898a-b6e7-48a0-b3bc-5064972cc5e3',
    '64d896f0-8dd9-4439-a713-214f46198382',
    '50'
);

console.log('Test 5. All data.');
createDonation(
    'e735898a-b6e7-48a0-b3bc-5064972cc5e3',
    '64d896f0-8dd9-4439-a713-214f46198382',
    50
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
login('VKarin4', '111');

console.log('Test 4. All data.');
login('VKarin4', '202cb962ac59075b964b07152d234b70');

// Check if User logged in.
console.log('Test 1  No user session');
checkIfLoggedIn(null);

console.log('Test 2  User session');
checkIfLoggedIn('a07fd15cf173d045ef51b1dc17296f5b');

// Logout User (businessRules)
console.log('Test 1. No Login Session.');
logout(null);

console.log('Test 1. All data.');
logout('a07fd15cf173d045ef51b1dc17296f5b');

//Update User (businessRules)
console.log('Test 1. No Id.');
updateUser(null, 'firstName', 'Vovchik');

console.log('Test 2. Wrong Id.');
updateUser('b9147f51-8050-443e-9480-81cb621aca55', 'firstName', 'Vovchik');

console.log('Test 3. No key.');
updateUser('b9147f51-8050-443e-9480-81cb621aca5a', null, 'Vovchik');

console.log('Test 4. No value.');
updateUser('b9147f51-8050-443e-9480-81cb621aca5a', 'firstName', undefined);

console.log('Test 5. All data.');
updateUser('b9147f51-8050-443e-9480-81cb621aca5a', 'firstName', 'Vovchik');

//Delete User (businessRules)
console.log('Test 1. No Id.');
deleteUser(null);

console.log('Test 2. All data.');
deleteUser('b9147f51-8050-443e-9480-81cb621aca5a');

//Checked if logged in
console.log('Test 1. No login session');
checkIfLoggedIn(null);

console.log('Test 2. Wrong login session');
checkIfLoggedIn('4074df08bb38afda47c375bd8667dfss');

console.log('Test 1. Correct login session');
console.log(checkIfLoggedIn('e20a72bf8f1bab53495e0b810fd3e24c'));

//Get Ideas (businessRules)
console.log(getIdeas());

//Sorted by donation sum ideas (businessRules)
console.log(sortIdeasByTotalDonationSum());

// Create Idea (businessRules)
console.log('Test 1. No header. ');
createIdea(
    null,
    'Descriptive description',
    750,
    '9c87f20a-e9a4-4ed3-8922-ac8f1ae087b8'
);

console.log('Test 2. No description. ');
createIdea(
    'Headering header',
    null,
    750,
    '9c87f20a-e9a4-4ed3-8922-ac8f1ae087b8'
);

console.log('Test 3. Asked Sum not a number. ');
createIdea(
    'Headering header',
    'Descriptive description',
    '750',
    '9c87f20a-e9a4-4ed3-8922-ac8f1ae087b8'
);

console.log('Test 4. No asked sum. ');
createIdea(
    'Headering header',
    'Descriptive description',
    null,
    '9c87f20a-e9a4-4ed3-8922-ac8f1ae087b8'
);

console.log('Test 5. No user ID. ');
createIdea('Headering header', 'Descriptive description', 750, null);

console.log('Test 6. All data. ');
createIdea(
    'Headering header',
    'Descriptive description',
    750,
    '9c87f20a-e9a4-4ed3-8922-ac8f1ae087b8'
);

//Update Ideas Status (business Rules)
console.log('Test 1. No Idea Id.');
updateIdeasStatus(null, true);

console.log('Test 2. No status.');
updateIdeasStatus('02196e3d-f4b0-4959-adc5-af36b7f6b5b9', undefined);

console.log('Test 3. All data (true).');
updateIdeasStatus('02196e3d-f4b0-4959-adc5-af36b7f6b5b9', true);

console.log('Test 4. All data (false).');
updateIdeasStatus('02196e3d-f4b0-4959-adc5-af36b7f6b5b9', false);

// Pending ideas list
console.log(pendingIdeasList());

// Approved ideas list
console.log(approvedIdeasList());

// Rejected ideas list
console.log(rejectedIdeasList());


// Create Donation by unregistered user
console.log('Test 1. No ideaId');
createDonationByUnregisteredUser(null, 'Vovchik', 25);

console.log('Test 2. No firstName');
createDonationByUnregisteredUser(
    '02196e3d-f4b0-4959-adc5-af36b7f6b5b9',
    null,
    25
);

console.log('Test 3. No sum');
createDonationByUnregisteredUser(
    '02196e3d-f4b0-4959-adc5-af36b7f6b5b9',
    'Vovchik',
    null
);

console.log('Test 4. Sum is not a number');
createDonationByUnregisteredUser(
    '02196e3d-f4b0-4959-adc5-af36b7f6b5b9',
    'Vovchik',
    '250'
);

console.log('Test 5. All data');
createDonationByUnregisteredUser(
    '02196e3d-f4b0-4959-adc5-af36b7f6b5b9',
    'Vovchik',
    10
);

// Create Donation by registered user

console.log('Test 1. No user id');
createDonationByRegisteredUser(
    null,
    '26877c11-30ac-4f93-8a89-8136c3ddb2e4',
    10
);

console.log('Test 2. No idea id');
createDonationByRegisteredUser(
    '8f29d0e6-afda-4171-b309-84ece4f95cb7',
    null,
    10
);

console.log('Test 3. No sum');
createDonationByRegisteredUser(
    '8f29d0e6-afda-4171-b309-84ece4f95cb7',
    '1abe9594-259a-4b80-a12c-3267d6fce9e0',
    null
);

console.log('Test 3. Sum is not a number');
createDonationByRegisteredUser(
    '8f29d0e6-afda-4171-b309-84ece4f95cb7',
    '1abe9594-259a-4b80-a12c-3267d6fce9e0',
    '50'
);


console.log('Test 4. All data');
createDonationByRegisteredUser(
    '8f29d0e6-afda-4171-b309-84ece4f95cb7',
    '1abe9594-259a-4b80-a12c-3267d6fce9e0',
    10
);

// Get Ideas total donation sum
console.log(getTotalSumDonatedForIdea('02196e3d-f4b0-4959-adc5-af36b7f6b5b9'));
*/
// console.log(login('DVader', '202cb962ac59075b964b07152d234b70'));
// console.log(findRegisteredUser('DVader', 123));
// console.log(getTotalSumDonatedForIdea('70c8e131-ac49-453f-85f6-d18160b7be19'));
// console.log(getDonationsForIdea('5001b5d8-8b31-41d2-a02c-731e77d06d70'));
// console.log(getUsersDonations('8f29d0e6-afda-4171-b309-84ece4f95cb7'));
