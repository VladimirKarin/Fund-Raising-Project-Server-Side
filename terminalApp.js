/* Testing App */
const { createUser, deleteUser } = require('./models/users');
// const { createUser } = require('./models/users.js');
const { createDonation } = require('./models/donations');
const { createIdea, deleteIdea } = require('./models/ideas');

//FR-31 testin user creation function

// createUser('DVader', '202cb962ac59075b964b07152d234b70', 'Darth', 'Vader');
// console.log(createUser('masterYoda', '202cb962ac59075b964b07152d234b70', 'Master', 'Yoda'));

//FR-32 test delete user function

deleteUser('48ba4d1a-cf29-46ea-9252-292c4c486a54');

//FR 33-- testing idea creation function

// createIdea(
//     'New Brains2',
//     'Think about having a spare pair of new brains',
//     '200002',
//     'e6328604-cd5b-46ff-920d-ea6c91e5eb88'
// );

//FR-34 testin idea delete function

// deleteIdea('6f871b10-9462-4ead-b3a3-c63505e0f5c1');

//FR-36 testing create donation function

createDonation(
    'Master',
    '5000',
    '45ff012c-be0d-487e-9b9d-7f53471821b0',
    'c1ca74ae-c42d-4b51-b814-2edcd8af35ec'
);

