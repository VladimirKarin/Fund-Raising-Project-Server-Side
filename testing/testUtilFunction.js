/* Testing App */

const { createUser, deleteUser } = require('../models/users');
// const { createUser } = require('./models/users.js');
const { createDonation } = require('../models/donations');
const {
    createIdea,
    deleteIdea,
    getAllIdeas,
    updateIdea,
} = require('../models/ideas');
const {
    getIdeas,
    sortedByDonationSumIdeas,
    createIdeas,
    ideasStatusApproval,
    pendingIdeasList,
    approvedIdeasList,
} = require('../businessRules/ideas');
const {
    createDonationsWithDataValidation,
    ideasDonationSum,
    ideasSumDifference,
} = require('../businessRules/donations');
const {
    registerUser,
    usersList,
    updateUser,
    login,
} = require('../businessRules/users');
/*
FR-31 testin user creation function

createUser('DVader', '202cb962ac59075b964b07152d234b70', 'Darth', 'Vader');
console.log(createUser('masterYoda', '202cb962ac59075b964b07152d234b70', 'Master', 'Yoda'));

FR-32 test delete user function

deleteUser('b239a9ed-acf7-4988-8569-6b35d966b242');

FR 33-- testing idea creation function

createIdea(
    'New liver, for Alcoholics',
    'Perhaps it you need one?',
    5000,
    '7a693f37-ccb4-4ecb-be2b-8e34749430b5'
);

FR-34 testin idea delete function

deleteIdea('a6bbff48-113a-46fb-9338-9e5844275333');

FR-36 testing create donation function
console.log('Test 1 - No Data at all');
createDonationsWithDataValidation(null, null, null, null);


console.log('Test 2 - no firstName, no sum, no userID, entered ideaId');
createDonationsWithDataValidation(
    null,
    null,
    null,
    '6055e10e-1b89-4213-81cf-360c2e6dc6a1'
);

console.log(
    'Test 3 - entered firstName, entered sum, no userID, entered ideaId'
);
createDonationsWithDataValidation(
    'Any',
    null,
    null,
    '6055e10e-1b89-4213-81cf-360c2e6dc6a1'
);

console.log(
    'Test 4 - entered firstName, entered sum, entered userID, entered noideaId'
);
createDonationsWithDataValidation(
    null,
    50,
    null,
    '6055e10e-1b89-4213-81cf-360c2e6dc6a1'
);

console.log(
    'Test 5 - entered firstName, entered sum, entered userID, entered noideaId'
);
createDonationsWithDataValidation(
    null,
    null,
    '81c3be9a-009b-4c44-b034-ae2a4276c850',
    '6055e10e-1b89-4213-81cf-360c2e6dc6a1'
);
console.log(
    'Test 6 - no firstName, entered sum, entere userID, entered noideaId'
);
createDonationsWithDataValidation(
    null,
    50,
    '81c3be9a-009b-4c44-b034-ae2a4276c850',
    '6055e10e-1b89-4213-81cf-360c2e6dc6a1'
);

console.log(
    'Test 7 - no firstName, entered sum, entere userID, entered noideaId'
);
createDonationsWithDataValidation(
    'Any',
    '50',
    '81c3be9a-009b-4c44-b034-ae2a4276c850',
    '6055e10e-1b89-4213-81cf-360c2e6dc6a1'
);

FR-26 testing idea update function

console.log('Test 1 - All Data');
updateIdea('6055e10e-1b89-4213-81cf-360c2e6dc6a1', 'askedSum', 1500);
console.log('Test 2 - No Id');
updateIdea('6055e10e-1b89-4213-81cf-360c2e6dc6aa', 'askedSum', 1500);
console.log('Test 3 - No key');
updateIdea('6055e10e-1b89-4213-81cf-360c2e6dc6a1', null, 1500);
console.log('Test 4 - All Data');
updateIdea('6055e10e-1b89-4213-81cf-360c2e6dc6a1', 'askedSum', undefined);

createIdea(
    'header2',
    'description2',
    20,
    'e6328604-cd5b-46ff-920d-ea6c91e5eb88'
);
getIdeas();

console.log(sortedByDonationSumIdeas());

DonationData Tests

createDonationsWithDataValidation(
    'Master',
    17,
    'a9670cd0-85fa-4847-966b-ab10d58e7a67',
    'a6bbff48-113a-46fb-9338-9e5844275e1f'
);

createDonationsWithDataValidation(
    null,
    17,
    'a9670cd0-85fa-4847-966b-ab10d58e7a67',
    'a6bbff48-113a-46fb-9338-9e5844275e1f'
);
createDonationsWithDataValidation(
    'Master',
    17,
    null,
    'a6bbff48-113a-46fb-9338-9e5844275e1f'
);
createDonationsWithDataValidation(
    null,
    17,
    null,
    'a6bbff48-113a-46fb-9338-9e5844275e1f'
);

RegisterUser Test

console.log('Test 1- All data');
registerUser('StormTrooper', '123', 'Storm', 'Trooper');

console.log('Test 2- No firstName');
registerUser('StormTrooper2', '123', null, 'Trooper');

console.log('Test 3- No lastName');
registerUser('StormTrooper3', '123', 'Storm', null);

console.log('Test 4- No firstName and no lastName');
registerUser('StormTrooper4', '123', null, null);

console.log('Test 5- No userName');
registerUser(null, '123', 'Storm', 'Trooper');

console.log('Test 6- No Password');
registerUser('StormTrooper', null, 'Storm', 'Trooper');

Testing createIdea function

createIdeas(
    'HEADER',
    'Description.Description.Description.',
    500,
    '57226ce8-3e44-4f98-83b1-eff8e257a842'
);
createIdeas(
    null,
    'Description.Description.Description.',
    500,
    '57226ce8-3e44-4f98-83b1-eff8e257a842'
);
createIdeas('HEADER', null, 500, '57226ce8-3e44-4f98-83b1-eff8e257a842');
createIdeas(
    'HEADER',
    'Description.Description.Description.',
    null,
    '57226ce8-3e44-4f98-83b1-eff8e257a842'
);
createIdeas('HEADER', 'Description.Description.Description.', 500, null);
FR-46 Create ideas donation sum function testing.
console.log(getAllIdeas());

console.log(ideasDonationSum('6ae1ea20-6e79-45f8-8265-eba8a3d22677'));

Testing a function that calculates difference between ideas sum and sum of all donations for the idea
console.log(ideasSumDifference('70c8e131-ac49-453f-85f6-d18160b7be19'));

FR-47 Testing function that updated ideas approve status. And deletes if not approved.
createIdea(
    'Test-HEADER-Test',
    'Test-Description-Test',
    1500,
    'bf51ee23-9707-432a-9f76-6f43b36860cc'
);

ideasStatusApproval('1e1368ee-e95e-4e0d-83af-91c1e0d85050', 'approved');

createIdea(
    'Test-HEADER-Test-TO-DELETE',
    'Test-Description-Test-TO-DELETE',
    1500,
    'bf51ee23-9707-432a-9f76-6f43b36860cc'
);
ideasStatusApproval('e3987170-6bd8-42f2-8040-7ad4fe97d2aa', 'denied');

FR-48 testing function that show ideas with 'pending' status only
ideasStatusApproval('a852a6b6-1b0c-4836-a9a6-07c23845280e', 'approved');
ideasStatusApproval('70c8e131-ac49-453f-85f6-d18160b7be19', 'approved');

console.log(pendingIdeasList());


FR-49 Testing function that shows ideas with 'approved status only
console.log(approvedIdeasList());

FR-50 testing Function that returns users list
console.log(usersList());

FR-53 Testing updateUser function

console.log('Test 1 - ALL DATA');
updateUser('542c7ebb-55aa-4375-8da7-632a7269849a', 'firstName', 'NOTanonymous');
console.log('Test 2 - ALL DATA');
updateUser('542c7ebb-55aa-4375-8da7-632a7269849a', 'lastName', 'NOTincognito');
console.log('Test 3 - ALL DATA');
updateUser(
    '542c7ebb-55aa-4375-8da7-632a7269849a',
    'picture',
    './img/strangeDefaultPicture.jpeg'
);

console.log('Test 4 - No userId');
updateUser(null, 'firstName', 'NOTanonymous');
console.log('Test 5 - no key');
updateUser('542c7ebb-55aa-4375-8da7-632a7269849a', null, 'NOTanonymous');
console.log('Test 6 - no value');
updateUser('542c7ebb-55aa-4375-8da7-632a7269849a', 'firstName');

FR-54 Testing deleteUser function

deleteUser('19e4f79f-4776-4612-8ff2-1a6d2cd88eca'); // should delete RU3 user
*/
