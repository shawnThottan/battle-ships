// config.js
const env = process.env.NODE_ENV; // 'dev' or 'test'

const dev = {
  db: 'mongodb://localhost/battleship'
};

const test = {
  db: 'mongodb://localhost/battleship_test'
};

const config = {
  dev,
  test
};

module.exports = config[env];
