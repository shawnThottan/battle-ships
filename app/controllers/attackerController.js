const { getShipById } = require('../utils');
const Game = require('../models/game');
const Move = require('../models/move');

async function attack(_id, details) {
  const game = await Game.findOne({ _id });
  if (!game) throw 'Not Found';
  if (game.status == 'ended')
    return (
      'Win! You have completed the game in ' + game.attack_count + ' moves'
    );
  if (game.status != 'attacking') throw 'Not Ready to Attack.';

  const xPos = parseInt(details.xPos);
  const yPos = parseInt(details.yPos);

  const point = game.current_state[yPos]?.[xPos];

  if (!point && point != 0) throw 'Invalid Position';

  let status;
  game.attack_count++;

  if (point === 0) status = 'Miss';
  else {
    // Checks whether any remaining parts of the ship is left.
    if (
      game.current_state[yPos - 1]?.[xPos] === point ||
      game.current_state[yPos]?.[xPos - 1] === point ||
      game.current_state[yPos + 1]?.[xPos] === point ||
      game.current_state[yPos]?.[xPos + 1] === point
    )
      status = 'Hit';

    // if not, the whole ship has been sunk
    if (!status) {
      const ship = getShipById(point);
      status = 'You just sank a ' + ship;
      game[ship]--;
      game.total_ships--;
    }

    // when all ships have been sunk
    if (game.total_ships == 0) {
      status =
        'Win! You have completed the game in ' + game.attack_count + ' moves';
      game.status = 'ended';
    }

    game.current_state[yPos][xPos] = 0;
    game.markModified('current_state');
  }
  await game.save();

  const move = new Move();
  move.game_id = game._id;
  move.xPos = xPos;
  move.yPos = yPos;
  move.hit = point === 0;
  await move.save();

  return status;
}

module.exports = {
  attack
};
