const { Schema, plugin, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');

plugin(mongoosePaginate);
plugin(uniqueValidator);

module.exports = model(
  'Rating',
  new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comment: String,
    rate: Number,
    date: Date,
  })
);
