'use strict'
const jwt = require('jsonwebtoken')
const Question = require('../models/Question')

module.exports = {
  questionCreate: (req, res) => {
    let decoded = jwt.verify(req.headers.apptoken, process.env.JWT)
    let newQuestion = new Question ({
      title: req.body.title,
      description: req.body.description,
      user: decoded.id
    })
    newQuestion
      .save()
      .then((question) => {
        res.status(201).json({
          message:'Question successfully created!',
          question
        })
      })
      .catch((err) => {
        res.status(500).json({
          message:'Error creating new question!',
          err
        })
      })
  },
  questionReadAll: (req, res) => {
    Question
      .find()
      .populate('user')
      .exec()
      .then((questions) => {
        res.status(200).json({
          message: `Successfully get all questions!`,
          questions
        })
      })
      .catch((err) => {
        res.status(500).json({
          message:'Error getting questions!',
          err
        })
      })
  },
  questionReadById: (req, res) => {
    Question
      .findById(req.params.id)
      .populate('user')
      .exec()
      .then((question) => {
        res.status(200).json({
          message: `Successfully get requested question!`,
          question
        })
      })
      .catch((err) => {
        res.status(500).json({
          message:'Error getting question!',
          err
        })
      })
  },
  questionUpdate: (req, res) => {
    let decoded = jwt.verify(req.headers.apptoken, process.env.JWT)    
    Question
      .findById(req.params.id)
      .then((question) => {
        if (question && question.user == decoded.id) {
          let updateValue = {
            title: req.body.title || question.title,
            description: req.body.description || question.description,
            solved: req.body.solved || question.solved
          }
          Question
            .update(
              {_id: question._id},
              {$set: updateValue}
            )
            .then((response) => {
              res.status(200).json({
                message: `Successfully update question!`,
                response
              })
            })
            .catch((err) => {
              res.status(500).json({
                message: `Error updating question!`,
                err
              })
            })
        } else {
          res.status(500).json({
            message: `Error updating question!`,
            err
          })
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: `Error updating question!`,
          errr
        })
      })
  },
  questionDelete: (req, res) => {
    let decoded = jwt.verify(req.headers.apptoken, process.env.JWT)    
    Question
      .findById(req.params.id)
      .then((question) => {
        if (question && question.user == decoded.id) {
          Question
            .remove({_id: req.params.id})
            .then((response) => {
              res.status(200).json({
                message: `Successfully delete question!`,
                response
              })
            })
            .catch((err) => {
              res.status(500).json({
                message: `Error deleting question!`,
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