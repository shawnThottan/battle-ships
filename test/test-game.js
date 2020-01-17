const test = require('tape');
const request = require('supertest');
const mongoose = require('mongoose');
const async = require('async');
const { app, connection } = require('../server');
const { ships } = require('./utils');

test('Playing a whole game', async t => {
  let game_token;
  await request(app)
    .get('/start')
    .expect(200)
    .expect(({ text }) => {
      t.true(mongoose.Types.ObjectId.isValid(text), 'Started Game');
      game_token = text;
    });

  console.log(game_token);
  // Places all ships.
  let requests = [];
  for (let i = 0; i < 10; i++) {
    requests.push(cb => {
      request(app)
        .get('/' + game_token + '/place')
        .query({
          ship: ships[i],
          xPos: i % 2 == 0 ? 0 : 5,
          yPos: i % 2 == 0 ? i : i - 1
        })
        .expect(200)
        .then(() => cb())
        .catch(err => t.fail(err));
    });
  }
  await async.series(requests);

  t.pass('Placed all ships successfully.');

  // Attacks at all coordinates.
  requests = [];
  for (let i = 0; i < 100; i++) {
    requests.push(cb => {
      request(app)
        .get('/' + game_token + '/attack')
        .query({
          xPos: i / 10,
          yPos: i % 10
        })
        .expect(200)
        .then(() => cb())
        .catch(err => t.fail(err));
    });
  }
  await async.series(requests);

  t.pass('Successfully played the game.');
  t.end();
});

test.onFinish(async () => {
  await connection.dropDatabase();
  process.exit(0);
});
