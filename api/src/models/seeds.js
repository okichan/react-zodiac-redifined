const Zodiac = require('./zodiac')

Zodiac.find()
  .then(animals => {
    console.log(animals);
  })