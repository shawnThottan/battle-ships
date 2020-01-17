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
      t.true(mongoose.Types.ObjectId.isValid(text));
      game_token = text;
    })
    .catch(() => t.fail());

  // Valid Id
  await request(app)
    .get('/' + game_token + '/status')
    .expect(200)
    .expect(({ body }) => {
      let flag = true;
      if (body.length != 10) flag = false;
      for (let i = 0; i < 10; i++) {
        if (body[i].length != 10) flag = false;
        for (let j = 0; j < 10; j++) if (body[i][j] != 0) flag = false;
      }
      t.true(flag);
    })
    .catch(() => t.fail());

  // Invalid Id
  await request(app)
    .get('/' + mongoose.Types.ObjectId() + '/status')
    .expect(404)
    .catch(() => t.pass('Expected Result'));

  t.end();
});

test.onFinish(async () => {
  await connection.dropDatabase();
  process.exit(0);
});
