/*!
 * Module dependencies
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Game schema
 */

var matrix = [];
for (let i = 0; i < 10; i++) matrix[i] = new Array(10).fill(0);

const GameSchema = new Schema({
  started_at: { type: Date, default: Date.now },
  start_state: { type: Array, of: Array },
  current_state: {
    type: Array,
    of: Array,
    default: matrix,

    // Validates the map to contain only valid values within the area.
    validate: {
      validator: y => {
        return (
          y.length > 10 ||
          y.every(x => x.length > 10 || x.every(v => v >= 0 && v <= 5))
        );
      },
      message: () => `Ship's position is invalid.`
    }
  },
  ended_at: { type: Date },
  attack_count: { type: Number, default: 0 },
  status: { type: String, default: 'placing_ships' },
  total_ships: {
    type: Number,
    default: 0,
    max: 10
  },
  battleship: {
    type: Number,
    default: 0,
    max: 1
  },
  cruiser: {
    type: Number,
    default: 0,
    max: 2
  },
  destroyer: {
    type: Number,
    default: 0,
    max: 3
  },
  submarine: {
    type: Number,
    default: 0,
    max: 4
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */

GameSchema.method({});

/**
 * Statics
 */

GameSchema.static({});

/**
 * Register
 */

module.exports = mongoose.model('Game', GameSchema);
