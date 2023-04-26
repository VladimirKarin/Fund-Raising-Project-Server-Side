/* Testing App */

const { createUser, deleteUser } = require('../models/users');
// const { createUser } = require('./models/users.js');
const { createDonation } = require('../models/donations');
const { createIdea, deleteIdea, getAllIdeas } = require('../models/ideas');
const {
    getIdeas,
    sortedByDonationSumIdeas,
    createIdeas,
    ideasStatusApproval,
} = require('../businessRules/ideas');
const {
    donationData,
    ideasDonationSum,
    ideasSumDifference,
} = require('../businessRules/donations');
const { registerUser } = require('../businessRules/users');
/*
FR-31 testin user creation function

createUser('DVader', '202cb962ac59075b964b07152d234b70', 'Darth', 'Vader');
console.log(createUser('masterYoda', '202cb962ac59075b964b07152d234b70', 'Master', 'Yoda'));

FR-32 test delete user function

deleteUser('48ba4d1a-cf29-46ea-9252-292c4c486a54');

FR 33-- testing idea creation function

createIdea(
    'New Brains2',
    'Think about having a spare pair of new brains',
    '200002',
    'e6328604-cd5b-46ff-920d-ea6c91e5eb88'
);

FR-34 testin idea delete function

deleteIdea('6f871b10-9462-4ead-b3a3-c63505e0f5c1');

FR-36 testing create donation function

createDonation(
    'Master',
    '5000',
    '45ff012c-be0d-487e-9b9d-7f53471821b0',
    'c1ca74ae-c42d-4b51-b814-2edcd8af35ec'
);

FR-26 testing idea update function
updateIdea('333e02ba-8e79-472f-8441-a4da39884253', 'askedSum', 50);
createIdea(
    'header2',
    'description2',
    20,
    'e6328604-cd5b-46ff-920d-ea6c91e5eb88'
);
getIdeas();
console.log(sortedByDonationSumIdeas());

DonationData Tests

donationData(
    'Darth',
    10,
    '6fba75be-1f13-449e-b8ee-0d9287d70208',
    '4e94a388-268d-46c9-b888-b2279c469ecd'
// );
donationData(
    null,
    10,
    '6fba75be-1f13-449e-b8ee-0d9287d70208',
    '4e94a388-268d-46c9-b888-b2279c469ecd'
);
donationData('Vladimir', 10, null, '4e94a388-268d-46c9-b888-b2279c469ecd');
donationData(null, 10, null, '4e94a388-268d-46c9-b888-b2279c469ecd');

RegisterUser Test
registerUser('MasterYoda', '123', 'Master', 'Yoda');
registerUser('AnonymousDroid', '123', null, 'Droid');
registerUser('MrSpaceNalls', '123', 'Mr', null);
registerUser('Chewbacca', '123', null, null);


Testing createIdea function
createIdeas(
    'Another simply awesome header',
    'Fantastic description of simplu magnificent idea!',
    250,
    'a9670cd0-85fa-4847-966b-ab10d58e7a67'
);
createIdeas(
    null,
    'Fantastic description of simplu magnificent idea!',
    250,
    'a9670cd0-85fa-4847-966b-ab10d58e7a67'
);
createIdeas(
    'Another simply awesome header',
    null,
    250,
    'a9670cd0-85fa-4847-966b-ab10d58e7a67'
);
createIdeas(
    'Another simply awesome header',
    'Fantastic description of simplu magnificent idea!',
    null,
    'a9670cd0-85fa-4847-966b-ab10d58e7a67'
);
createIdeas(
    'Another simply awesome header',
    'Fantastic description of simplu magnificent idea!',
    250,
    null
);
 
FR-46 Create ideas donation sum function testing.
console.log(getAllIdeas());
console.log(ideasDonationSum('4e94a388-268d-46c9-b888-b2279c469ecd'));

Testing a function that calculates difference between ideas sum and sum of all donations for the idea
ideasSumDifference('4e94a388-268d-46c9-b888-b2279c469ecd');

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
*/
