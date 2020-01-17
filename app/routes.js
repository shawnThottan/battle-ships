const express = require('express');
const router = express.Router();
const gameController = require('./controllers/gameController');
const defenderController = require('./controllers/defenderController');
const attackerController = require('./controllers/attackerController');

router.get('/start', async (req, res) => {
  try {
    const id = await gameController.startGame();
    res.status(200).send(id);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.get('/:gameId/status', async (req, res) => {
  try {
    const status = await gameController.getStatus(req.params.gameId);
    res.setHeader('content-type', 'application/json');
    res.status(200).send(status);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.get('/:gameId/place', async (req, res) => {
  try {
    const { current_state } = await defenderController.placeShip(
      req.params.gameId,
      req.query
    );
    res.setHeader('content-type', 'application/json');
    res.status(200).send(current_state);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.get('/:gameId/attack', async (req, res) => {
  try {
    const status = await attackerController.attack(
      req.params.gameId,
      req.query
    );
    res.status(200).send(status);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

module.exports = router;
