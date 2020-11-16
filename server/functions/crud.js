const { User, Photo, Post, Token } = require('../models');
const { createHash } = require('../functions/token');

function createUser(name, username, email, password, agent, ip, date) {
  return new User({ name, username, email, password: createHash(password), agents: [agent], ip, date }).save();
}
function createPhoto(name, user, type, title, date) {
  return new Photo({ name, user, type, title, date }).save();
}
function createPost(name, cover, user, title, content, category, date) {
  return new Post({ name, cover, user, title, content, category, date }).save();
}
function createToken(user, email, expires, token, type) {
  return new Token({ user, email, expires, token, type }).save();
}

function deleteUser(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      await User.findByIdAndDelete(userId);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  createPhoto,
  createPost,
  createToken,
  createUser,
  deleteUser,
};
