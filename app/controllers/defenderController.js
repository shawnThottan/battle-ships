const { getShipByName } = require('../utils');
const Game = require('../models/game');

async function placeShip(_id, details) {
  const game = await Game.findOne({ _id });
  if (!game) throw 'Not Found';
  if (game.status != 'placing_ships') throw 'All Ships have been placed.';

  const { ship } = details;
  const { id, size } = getShipByName(ship);

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
        if (
          (j == 0 && k == 0 && value != 0) || // if the coordinates to place the ship is not 0.
          (value != null && value > 0 && value <= 4) // if the surrounding points are not clear
        )
          throw 'Invalid Position';
      }

  // Places the ship
  for (let i = 0; i < size; i++)
    if (vertical) game.current_state[yPos + i][xPos] = id;
    else game.current_state[yPos][xPos + i] = id;
  game[ship]++;
  game.total_ships++;

  // All ships have been placed.
  if (game.total_ships == 10) {
    game.status = 'attacking';
    game.start_state = game.current_state;
  }

  game.markModified('current_state');

  return game.save();
}

module.exports = {
  placeShip
};
