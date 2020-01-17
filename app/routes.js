const express = require('express');
const router = express.Router();
const gameController = require('./controllers/gameController');

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
    const { current_state } = await gameController.placeShip(
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

module.exports = router;
