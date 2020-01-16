/*!
 * Module dependencies
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Game schema
 */

var matrix = [];
for (let i = 0; i < 9; i++) {
  matrix[i] = new Array(9);
}

const GameSchema = new Schema({
  started_at: { type: Date, default: Date.now },
  start_state: { type: Array, of: Array },
  current_state: { type: Array, of: Array, default: matrix },
  ended_at: { type: Date },
  result: { type: String, default: 'in_progress' }
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
