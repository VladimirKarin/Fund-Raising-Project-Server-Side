/* Testing App */
const { createUser, deleteUser } = require('./models/users');

//FR-31 testin user creation function

// createUser('DVader', '202cb962ac59075b964b07152d234b70', 'Darth', 'Vader');

//FR-32 test delete user function

deleteUser('48ba4d1a-cf29-46ea-9252-292c4c486a54');
