/* Testing App */
const { updateIdea } = require('./models/ideas.js');
// const { createUser } = require('./models/users.js');

//FR-31 testin user creation function

// console.log(createUser('masterYoda', '202cb962ac59075b964b07152d234b70', 'Master', 'Yoda')); up

//FR-26 testing idea update function
updateIdea(
    '1c3c007b-3a26-43a4-84a9-304f375ea52a',
    'header',
    'UPDATE ATTENTION! WOW'
);
