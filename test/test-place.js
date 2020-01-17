const test = require('tape');
const request = require('supertest');
const faker = require('faker');
const { app, connection } = require('../server');
const { getShipSize } = require('../app/utils');

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
  let xPos = faker.random.number(9 - getShipSize(ship).size);
  let yPos = faker.random.number(9 - getShipSize(ship).size);

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
      const size = getShipSize(ship);
      for (let i = 0; i < size; i++) {
        if (body[yPos][xPos] != 1) {
          flag = false;
          break;
        }
        if (vertical === true) yPos++;
        else xPos++;
      }
      t.true(flag);
    })
    .catch(() => t.fail());

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
    .catch(() => t.pass('Expected Result'));
  t.end();
});

test.onFinish(async () => {
  await connection.dropDatabase();
  process.exit(0);
});
