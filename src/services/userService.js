const User = require('../models/User');

async function createUser(username, passwordHash, totpSecret) {
  try {
    const user = new User({ username, passwordHash, totpSecret });
    return await user.save();
  } catch (err) {
    if (err.code === 11000) {
      const error = new Error('Username taken');
      error.status = 409;
      throw error;
    }
    throw err;
  }
}

function findByUsername(username) {
  return User.findOne({ username });
}

module.exports = {
  createUser,
  findByUsername
};
