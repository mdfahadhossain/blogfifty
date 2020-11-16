const { Schema, model } = require('mongoose');

module.exports = model(
  'Token',
  new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    email: { type: String, required: false },
    expires: { type: Number, required: true },
    token: { type: String, required: true },
    type: { type: String, required: true }, // password, email
  })
);
