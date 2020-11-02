const bcrypt = require('bcrypt');

const createSalt = () => new Promise((res, rej) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) rej(err);
    else res(salt);
  });
});

const createHash = (word, salt) => new Promise((res, rej) => {
  bcrypt.hash(word, salt, (err, hash) => {
    if (err) rej(err);
    else res(hash);
  });
});

const hash = async (word) => {
  try {
    const salt = await createSalt();
    const hashedWord = await createHash(word, salt);
    return hashedWord;
  } catch (err) {
    console.error('Failed to salt and hash password!');
    throw err;
  }
};

module.exports = hash;
