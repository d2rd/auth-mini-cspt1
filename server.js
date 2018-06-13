const express = require('express')
const server = express()
const mongoose = require('mongoose')
const User = require('./User')

mongoose.connect('mongodb://localhost/authDemo')
  .then(() => {
    console.log('\n === Database Connected ===\n')
    server.listen(5001, () => {
      console.log('\n === Server Listening on Port 5001 === \n')
    })
  })
  .catch(err => console.log(err))

const wakeUp = (req, res, next) => {
  req.message = 'Good morning Dave...'
  next()
}

server.use(express.json())
server.use(wakeUp)
server.get('/', (req, res) => {
  res.status(200).json({msg: 'Connected to server'})
})

server.post('/register', (req, res) => {
  const user = new User(req.body)
  user.save()
    .then(user => res.status(201).json(user))
    .catch(err => res.status(500).send(err))
})

module.exports = mongoose.model

// ☞ 8f3847dd-6f69-4c5c-9170-cf1b105198d6
