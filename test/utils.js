const Game = require('../app/models/game');

async function placeShips() {
  const game = await new Game();
  //TODO: Replace with suitable randomise function.
  const matrix = [
    [1, 1, 1, 1, 0, 2, 2, 2, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 2, 2, 0, 3, 3, 0, 3, 3, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [3, 3, 0, 4, 4, 4, 0, 4, 4, 4],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [4, 4, 4, 0, 4, 4, 4, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  game.start_state = matrix;
  game.current_state = matrix;
  game.battleship = 1;
  game.cruiser = 2;
  game.destroyer = 3;
  game.submarine = 4;
  game.total_ships = 10;
  game.status = 'attacking';
  return game.save().then(game => game.id);
}

const ships = [
  'battleship',
  'cruiser',
  'cruiser',
  'destroyer',
  'destroyer',
  'destroyer',
  'submarine',
  'submarine',
  'submarine',
  'submarine'
];

module.exports = {
  placeShips,
  ships
};
