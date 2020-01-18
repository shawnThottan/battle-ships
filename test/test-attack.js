const test = require('tape');
const request = require('supertest');
const { app, connection } = require('../server');
const { placeShips } = require('./utils');

// ignores the console.log()
global.console.log = () => {};

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
      t.equals(text, 'Hit', 'returns `Hit` on occupied coordinates.');
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

  // Invalid Points.
  xPos = 10;
  yPos = 10;

  // Attack Ship
  await request(app)
    .get('/' + game_token + '/attack')
    .query({
      xPos,
      yPos
    })
    .expect(400)
    .expect(({ text }) => {
      t.equals(
        text,
        'Invalid Position',
        'returns `invalid position` on invalid position'
      );
    })
    .catch(err => err);
  t.end();
});

test.onFinish(async () => {
  await connection.dropDatabase();
  process.exit(0);
});
