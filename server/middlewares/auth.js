'use strict'

const jwt = require('jsonwebtoken')

module.exports = {
  authentication: (req, res, next) => {
    try {
      let decoded = jwt.verify(req.headers.apptoken, process.env.JWT)
      next()
    } catch (err) {
      res.status(500).json({
        message: `You dont have authentication to access this page, please login to continue.`,
        err
      })
    }
  },
  admin: (req, res, next) => {
    try {
      let decoded = jwt.verify(req.headers.apptoken, process.env.JWT)
      if (decoded.role === 'admin') {
        next()
      } else {
        throw new Error('Error')
      }
    } catch (err) {
      res.status(500).json({
        message: `You dont have authorization to access this page!`,
        err
      })
    }
  }
}