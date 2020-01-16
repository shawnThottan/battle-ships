const mongoose = require('mongoose');
const test = require('tape');
const request = require('supertest');
const { app, connection } = require('../server');

test('Start game', async t => {
  let game_token;

  await request(app)
    .get('/start')
    .expect(200)
    .expect(({ text }) => {
      console.log('_id: ', text);
      t.true(mongoose.Types.ObjectId.isValid(text));
      game_token = text;
    });

  console.log(game_token);
  t.end();
});

test.onFinish(async () => {
  await connection.dropDatabase();
  process.exit(0);
});
