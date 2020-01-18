const Game = require('../app/models/game');

async function placeShips() {
  const game = await new Game();
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

async function placeBattleShip() {
  const game = await new Game();
  const matrix = [
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  game.current_state = matrix;
  game.battleship = 1;
  game.cruiser = 0;
  game.destroyer = 0;
  game.submarine = 0;
  game.total_ships = 1;
  game.status = 'placing_ships';
  return game.save().then(game => game.id);
}

async function readyToSinkGame() {
  const game = await new Game();
  const matrix = [
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 4]
  ];
  game.current_state = matrix;
  game.battleship = 1;
  game.cruiser = 0;
  game.destroyer = 0;
  game.submarine = 1;
  game.total_ships = 2;
  game.status = 'attacking';
  return game.save().then(game => game.id);
}

const shipNames = ['battleship', 'cruiser', 'destroyer', 'submarine'];

const allShips = [
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
  placeBattleShip,
  readyToSinkGame,
  shipNames,
  allShips
};
