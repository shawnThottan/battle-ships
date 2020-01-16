const express = require('express');
const router = express.Router();
const Game = require('../app/models/game');

router.get('/start', (req, res) => {
  new Game().save().then(game => res.send(game.id));
});

router.get('/:gameId/status', (req, res) => {
  Game.findOne({ _id: req.params.gameId }).then(game =>
    res.send(game.current_state)
  );
});

module.exports = router;
