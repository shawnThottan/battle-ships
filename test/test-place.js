const test = require('tape');
const request = require('supertest');
const faker = require('faker');
const { app, connection } = require('../server');
const { getShipByName } = require('../app/utils');
const { placeShips, placeBattleShip, shipNames } = require('./utils');

test('Place Ships', async t => {
  // Creates game.
  let game_token;
  await request(app)
    .get('/start')
    .expect(200)
    .expect(({ text }) => {
      game_token = text;
    });

  // fakes the values to be passed on while placing the ship.
  let ship = faker.random.arrayElement(shipNames);
  let vertical = faker.random.boolean();
  let xPos = faker.random.number(9 - getShipByName(ship).size);
  let yPos = faker.random.number(9 - getShipByName(ship).size);

  /*
   * 1) Valid Placement
   */
  await request(app)
    .get('/' + game_token + '/place')
    .query({
      ship,
      vertical,
      xPos,
      yPos
    })
    .expect(200)
    .expect(({ body }) => {
      let flag = true;
      const size = getShipByName(ship);
      for (let i = 0; i < size; i++) {
        if (body[yPos][xPos] != 1) {
          flag = false;
          break;
        }
        if (vertical === true) yPos++;
        else xPos++;
      }
      t.true(flag, 'Placement on empty coordinates returns success.');
    })
    .catch(err => t.fail(err));

  /*
   * 2) Invalid Ship Name
   */
  await request(app)
    .get('/' + game_token + '/place')
    .query({
      ship: faker.name.firstName(),
      vertical,
      xPos,
      yPos
    })
    .expect(400)
    .expect(({ text }) => {
      t.equals(
        text,
        'Ship name is not valid',
        'Returns `Ship name is not valid` when the ship name is wrong.'
      );
    })
    .catch(err => err);

  /*
   * 3) Placing a ship on occupied coordinates.
   */
  await request(app)
    .get('/' + game_token + '/place')
    .query({
      ship,
      vertical,
      xPos,
      yPos
    })
    .expect(400)
    .expect(({ text }) => {
      t.equals(
        text,
        'Area Occupied',
        'Placing the ship on occupied coordinates returns `Area Occupied`'
      );
    })
    .catch(err => err);

  // Invalid Coordinates.
  xPos = 10;
  yPos = 10;

  /*
   * 4) Placing the ship on invalid coordinates.
   */
  await request(app)
    .get('/' + game_token + '/place')
    .query({
      ship,
      vertical,
      xPos,
      yPos
    })
    .expect(400)
    .expect(({ text }) => {
      t.equals(
        text,
        `Ship's position is invalid`,
        "Placing the ship on invalid coordinates returns Ship's position is invalid`"
      );
    })
    .catch(err => err);

  // Places all ships.
  game_token = await placeBattleShip();

  // Unoccupied Position.
  ship = 'battleship';
  xPos = 5;
  yPos = 0;

  /*
   * 5) Placing more than the allowed number of a specific ship.
   */
  await request(app)
    .get('/' + game_token + '/place')
    .query({
      ship,
      vertical,
      xPos,
      yPos
    })
    .expect(400)
    .expect(({ text }) => {
      t.equals(
        text,
        'Path `battleship` (2) is more than maximum allowed value (1).',
        'Placing a ship more than the allowed number of times, returns an error.'
      );
    })
    .catch(err => err);

  // Places all ships.
  game_token = await placeShips();

  // Unoccupied Position.
  ship = faker.random.arrayElement(shipNames);
  xPos = 4;
  yPos = 0;
  vertical = true;

  /*
   * 6) Placing the ship after the defender's turn has ended.
   */
  await request(app)
    .get('/' + game_token + '/place')
    .query({
      ship,
      vertical,
      xPos,
      yPos
    })
    .expect(400)
    .expect(({ text }) => {
      t.equals(
        text,
        'All Ships have been placed.',
        'Placing the ship after defenders turn returns `All Ships have been placed.`'
      );
    })
    .catch(err => err);

  t.end();
});

test.onFinish(async () => {
  await connection.dropDatabase();
  process.exit(0);
});
