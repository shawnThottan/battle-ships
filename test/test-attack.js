const test = require('tape');
const request = require('supertest');
const { app, connection } = require('../server');
const { readyToSinkGame, placeShips } = require('./utils');

// ignores the console.log()
global.console.log = () => {};

test('Attack Ships', async t => {
  let game_token = await placeShips();

  // Attack points that will Hit.
  let xPos = 0;
  let yPos = 0;

  /*
   * 1) Hit On Ship
   */
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

  /*
   * 2) Miss An Attack
   */
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

  /*
   * 3) Attack at invalid points.
   */
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

  /*
   * 4) Sink a Ship.
   */
  game_token = await readyToSinkGame();
  await request(app)
    .get('/' + game_token + '/attack')
    .query({
      xPos: 3,
      yPos: 0
    })
    .expect(200)
    .expect(({ text }) => {
      t.equals(
        text,
        'You just sank a battleship',
        'returns valid response on sinking a ship'
      );
    })
    .catch(err => t.fail(err));

  /*
   * 5) Win the game.
   */
  await request(app)
    .get('/' + game_token + '/attack')
    .query({
      xPos: 9,
      yPos: 9
    })
    .expect(200)
    .expect(({ text }) => {
      t.equals(
        text,
        'Win! You have completed the game in 2 moves',
        'returns valid response on winning the game.'
      );
    })
    .catch(err => t.fail(err));

  t.end();
});

test.onFinish(async () => {
  await connection.dropDatabase();
  process.exit(0);
});
