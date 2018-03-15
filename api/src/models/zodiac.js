const mongoose = require('./init')

const Zodiac = mongoose.model("Zodiac", {
  id: Number,
  name: String,
  description: String,
  uri: String,
  year: Number,
  personality: String
});

module.exports = Zodiac