const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  category_id: { type: String, required: true },
});

module.exports = mongoose.model('posts', Schema);