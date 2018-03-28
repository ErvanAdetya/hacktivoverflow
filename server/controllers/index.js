'user strict'
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
  login: (req, res) => {
    User
      .findOne({ username: req.body.username })
      .then((user) => {
        if(user) {
          let flag = bcrypt.compareSync(req.body.password, user.password)
          if(flag) {
            let apptoken = jwt.sign({
              id: user._id,
              username: user.username,
              email: user.email,
              first_name: user.first_name,
              last_name: user.last_name
            }, process.env.JWT)
            res.status(200).json({
              message: 'Signin successfull',
              user: {
                id: user._id,
                username: user.username,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name
              },
              apptoken: apptoken
            })
          }
        }
      })
      .catch((err) => {
        res.status(500).send(err)
      })
  },
  verifyToken: (req, res) => {
    try {
      let decoded = jwt.verify(req.headers.apptoken, process.env.JWT)
      res.status(200).json({
        status: true,
        user: {
          id: decoded.id,
          username: decoded.username,
          email: decoded.email,
          first_name: decoded.first_name,
          last_name: decoded.last_name
        }
      })
    } catch(err) {
      res.status(200).json({
        status:false
      })
    }
  }
}