/* Testing App */
const { updateIdea, createIdea } = require('./models/ideas.js');

// const { createUser } = require('./models/users.js');

//FR-31 testin user creation function

// console.log(createUser('masterYoda', '202cb962ac59075b964b07152d234b70', 'Master', 'Yoda')); up

//FR-26 testing idea update function
updateIdea('333e02ba-8e79-472f-8441-a4da39884253', 'askedSum', 50);
// createIdea(
//     'header2',
//     'description2',
//     20,
//     'e6328604-cd5b-46ff-920d-ea6c91e5eb88'
// );
