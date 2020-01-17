/*!
 * Module dependencies
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * User schema
 */

const MoveSchema = new Schema({
  game_id: { type: mongoose.Types.ObjectId, required: true },
  move_at: { type: Date, default: Date.now },
  xPos: { type: Number, required: true },
  yPos: { type: Number, required: true },
  hit: { type: Boolean, required: true }
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

MoveSchema.method({});

/**
 * Statics
 */

MoveSchema.static({});

/**
 * Register
 */

module.exports = mongoose.model('Move', MoveSchema);
