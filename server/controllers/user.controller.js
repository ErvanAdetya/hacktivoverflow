const User = require('../models/User')

module.exports = {
  userCreate: (req, res) => {
    let newUser = new User ({
      fbId: req.body.fbId,
      username: req.body.username,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password
    })
    newUser
      .save()
      .then((user) => {
        res.status(201).json({
          message:'User successfully created!',
          user
        })
      })
      .catch((err) => {
        res.status(500).json({
          message:'Error creating new user!',
          err
        })
      })
  }
}