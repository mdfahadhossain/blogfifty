const { Schema, plugin, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');

plugin(mongoosePaginate);
plugin(uniqueValidator);

module.exports = model(
  'Post',
  new Schema({
    name: { type: String, required: true, unique: true },
    cover: { type: Schema.Types.ObjectId, ref: 'Photo', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    ratings: [{ type: Schema.Types.ObjectId, ref: 'Rating', required: true }],
    title: { type: String, required: true },
    category: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, required: true },
    views: { type: Number, required: true, default: 0 },
  })
);
