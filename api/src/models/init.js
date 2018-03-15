const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/zodiac-redefined");
mongoose.Promise = global.Promise;

module.exports = mongoose;
