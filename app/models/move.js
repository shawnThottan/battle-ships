/*!
 * Module dependencies
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * User schema
 */

const MoveSchema = new Schema({
  game_id: { type: mongoose.Types.ObjectId, default: '' },
  move_at: { type: Date, default: Date.now },
  hashed_password: { type: String, default: '' },
  salt: { type: String, default: '' }
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

mongoose.model('User', MoveSchema);
