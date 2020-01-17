const Game = require('../models/game');
const { getShipSize } = require('../utils');

async function startGame() {
  return new Game().save().then(game => game.id);
}

async function getStatus(_id) {
  const game = await Game.findOne({ _id });
  if (!game) throw 'Not Found';
  return game.current_state;
}

async function placeShip(_id, details) {
  const game = await Game.findOne({ _id });
  if (!game) throw 'Not Found';
  if (game.status != 'placing_ships') throw 'All ships have been placed';

  const { ship } = details;
  const { id, size } = getShipSize(ship);

  let { vertical, xPos, yPos } = details;
  vertical = vertical === 'true';
  xPos = parseInt(xPos);
  yPos = parseInt(yPos);

  // Checks whether the neighbouring area is clear before placing the ship.
  for (let i = 0; i < size; i++)
    for (let j = -1; j < 2; j++)
      for (let k = -1; k < 2; k++) {
        let value;
        if (vertical) value = game.current_state[yPos + i + j]?.[xPos + k];
        else value = game.current_state[yPos + j]?.[xPos + i + k];
        if (value != null && value > 0 && value <= 4) throw 'Invalid Position';
      }

  // Places the ship
  for (let i = 0; i < size; i++)
    if (vertical) game.current_state[yPos + i][xPos] = id;
    else game.current_state[yPos][xPos + i] = id;
  game[ship]++;
  game.total_ships++;

  if (game.total_ships == 10) game.status = 'attacking';

  game.markModified('current_state');

  return game.save();
}

module.exports = {
  startGame,
  getStatus,
  placeShip
};
