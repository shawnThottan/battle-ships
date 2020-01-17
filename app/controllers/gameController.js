const Game = require('../models/game');

async function startGame() {
  return new Game().save().then(game => game.id);
}

async function getStatus(_id) {
  const game = await Game.findOne({ _id });
  if (!game) throw 'Not Found';
  return game.current_state;
}
module.exports = {
  startGame,
  getStatus
};
