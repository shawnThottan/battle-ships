const test = require('tape');
const request = require('supertest');
const { app, connection } = require('../server');
const { placeShips } = require('./utils');

test('Attack Ships', async t => {
  const game_token = await placeShips();

  // Attack points that will Hit.
  let xPos = 0;
  let yPos = 0;

  // Attack Ship
  await request(app)
    .get('/' + game_token + '/attack')
    .query({
      xPos,
      yPos
    })
    .expect(200)
    .expect(({ text }) => {
      t.equals(text, 'Hit', 'returned `Hit` on occupied coordinates.');
    })
    .catch(err => t.fail(err));

  // Attack points that will Miss
  xPos = 9;
  yPos = 9;

  // Attack Ship
  await request(app)
    .get('/' + game_token + '/attack')
    .query({
      xPos,
      yPos
    })
    .expect(200)
    .expect(({ text }) => {
      t.equals(text, 'Miss', 'Returned `Miss` on empty coordinates.');
    })
    .catch(err => t.fail(err));
  t.end();
});

test.onFinish(async () => {
  await connection.dropDatabase();
  process.exit(0);
});
