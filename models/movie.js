const mongoose = require('mongoose');

// Movie Schema
const movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('Movie', movieSchema);
