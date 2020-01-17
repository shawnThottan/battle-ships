const test = require('tape');
const request = require('supertest');
const faker = require('faker');
const { app, connection } = require('../server');
const { getShipByName } = require('../app/utils');

test('Place Ships', async t => {
  let game_token;
  await request(app)
    .get('/start')
    .expect(200)
    .expect(({ text }) => {
      game_token = text;
    });

  const ship = faker.random.arrayElement([
    'battleship',
    'cruiser',
    'destroyer',
    'submarine'
  ]);
  const vertical = faker.random.boolean();
  let xPos = faker.random.number(9 - getShipByName(ship).size);
  let yPos = faker.random.number(9 - getShipByName(ship).size);

  // Valid Placement
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
      t.true(flag, 'Placement on empty coordinates returned success.');
    })
    .catch(err => t.fail(err));

  // Invalid Placement
  await request(app)
    .get('/' + game_token + '/place')
    .query({
      ship,
      vertical,
      xPos,
      yPos
    })
    .expect(400)
    .catch(() => t.pass('Placement on occupied coordinates returns error'));
  t.end();
});

test.onFinish(async () => {
  await connection.dropDatabase();
  process.exit(0);
});
