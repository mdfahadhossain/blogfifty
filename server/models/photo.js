const { Schema, model, plugin } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

plugin(uniqueValidator);

module.exports = model(
  'Photo',
  new Schema({
    name: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    title: { type: String, required: true },
    date: { type: Date, required: true },
  })
);
