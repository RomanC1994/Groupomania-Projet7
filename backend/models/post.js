const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  userId: { type: String, required: true },
  pseudo: { type: String, required: true},
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  time: { type: String, required: true },
  likes: {type: Number, default: 0},
  usersLiked: {type: Array, default: []},
});

module.exports = mongoose.model('Post', postSchema);