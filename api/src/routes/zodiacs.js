const express = require('express')
const Zodiac = require('../models/zodiac')
const router = express.Router()

router.get('/zodiacs', (req, res) => {
  Zodiac.find()
    .then(zodiacs => {
      res.json(zodiacs)
    })
})

router.get('/zodiacs/:id', (req, res) => {
  const id = req.params.id
  Zodiac.find({ "year": id } || id)
    .then(zodiac => {
      res.json(zodiac)
    })
    .catch(error => {
      res.json({ error: error })
    })
})

module.exports = router