'use strict'
const jwt = require('jsonwebtoken')
const Question = require('../models/Question')
const Answer = require('../models/Answer')

module.exports = {
  answerCreate: (req, res) => {
    let decoded = jwt.verify(req.headers.apptoken, process.env.JWT)
    let newAnser = new Answer({
      answer: req.body.answer,
      question: req.params.questionId,
      user: decoded.id
    })
    newAnser
      .save()
      .then((answer) => {
        res.status(201).json({
          message:'Answer successfully created!',
          answer
        })
      })
      .catch((err) => {
        res.status(500).json({
          message:'Error creating new answer!',
          err
        })
      })
  },
  answerReadAll: (req, res) => {
    Answer
      .find()
      .populate('user')
      .populate('question')
      .exec()
      .then((answers) => {
        res.status(200).json({
          message: `Successfully get all answers!`,
          answers
        })
      })
      .catch((err) => {
        res.status(500).json({
          message:'Error getting answers!',
          err
        })
      })
  },
  answerReadByQuestion: (req, res) => {
    Answer
      .find({question: req.params.questionId})
      .populate('user')
      .populate('question')
      .exec()
      .then((answers) => {
        res.status(200).json({
          message: `Successfully get requested answers!`,
          answers
        })
      })
      .catch((err) => {
        res.status(500).json({
          message:'Error getting requested answers!',
          err
        })
      })
  },
  answerReadById: (req, res) => {
    Answer
      .find({_id: req.params.id})
      .populate('user')
      .populate('question')
      .exec()
      .then((answers) => {
        res.status(200).json({
          message: `Successfully get requested answers!`,
          answers
        })
      })
      .catch((err) => {
        res.status(500).json({
          message:'Error getting requested answers!',
          err
        })
      })
  },
  answerUpdate: (req, res) => {
    let decoded = jwt.verify(req.headers.apptoken, process.env.JWT)    
    Answer
      .findById(req.params.id)
      .then((answer) => {
        if (answer && answer.user == decoded.id) {
          let updateValue = {answer: req.body.answer}
          Answer
            .update(
              {_id: answer._id},
              {$set: updateValue}
            )
            .then((response) => {
              res.status(200).json({
                message: `Successfully update answer!`,
                response
              })
            })
            .catch((err) => {
              res.status(500).json({
                message: `Error updating answer!`,
                err
              })
            })
        } else {
          res.status(500).json({
            message: `Error updating answer!`,
            err
          })
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: `Error updating answer!`,
          errr
        })
      })
  },
  answerDelete: (req, res) => {
    let decoded = jwt.verify(req.headers.apptoken, process.env.JWT)    
    Answer
      .findById(req.params.id)
      .then((answer) => {
        if (answer && answer.user == decoded.id) {
          Answer
            .remove({_id: req.params.id})
            .then((response) => {
              res.status(200).json({
                message: `Successfully delete answer!`,
                response
              })
            })
            .catch((err) => {
              res.status(500).json({
                message: `Error deleting answer!`,
                err
              })
            })
        } else {
          res.status(500).json({
            message: `You dont have authorization to do this action!`,
            err
          })
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: `Error deleting question!`,
          errr
        })
      })
  }
}