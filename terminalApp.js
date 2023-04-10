/* Testing App */
// const { createUser } = require('./models/users.js');
const { createIdea, deleteIdea } = require('./models/ideas');

//FR-31 testin user creation function

// console.log(createUser('masterYoda', '202cb962ac59075b964b07152d234b70', 'Master', 'Yoda'));

//FR 33-- testin idea creation function

// createIdea(
//     'New Brains2',
//     'Think about having a spare pair of new brains',
//     '200002',
//     'e6328604-cd5b-46ff-920d-ea6c91e5eb88'
// );

//FR-34 testin idea delete function

deleteIdea('6f871b10-9462-4ead-b3a3-c63505e0f5c1');
