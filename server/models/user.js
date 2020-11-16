const { Schema, plugin, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

plugin(uniqueValidator);

module.exports = model(
  'User',
  new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: Schema.Types.ObjectId, ref: 'Photo', required: false },
    agents: [String],
    ip: [String],
    date: { type: Date, required: true },
  })
);
