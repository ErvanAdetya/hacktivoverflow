'use strict'
const jwt = require('jsonwebtoken')
const Vote = require('../models/Vote')

module.exports = {
  voteQuestionCreate: (req, res) => {
    let decoded = jwt.verify(req.headers.apptoken, process.env.JWT)
    let newVote = new Vote({
      vote: req.body.vote || true,
      user: decoded.id,
      question: req.params.id
    })
    newVote
    .save()
    .then((vote) => {
      res.status(201).json({
        message:'Vote for question successfully created!',
        vote
      })
    })
    .catch((err) => {
      res.status(500).json({
      message:'Error creating new vote for question!',
      err
      })
    })
  },
  voteAnswerCreate: (req, res) => {
    let decoded = jwt.verify(req.headers.apptoken, process.env.JWT)
    let newVote = new Vote({
      vote: req.body.vote || true,
      user: decoded.id,
      answer: req.params.id
    })
    newVote
    .save()
    .then((vote) => {
      res.status(201).json({
        message:'Vote for answer successfully created!',
        vote
      })
    })
    .catch((err) => {
      res.status(500).json({
        message:'Error creating new vote for answer!',
        err
      })
    })
  },
  voteReadAll: (req, res) => {
    Vote
      .find()
      .populate('answer')
      .populate('question')
      .populate('user')
      .exec()
      .then((votes) => {
          res.status(200).json({
            message: `Successfully get all votes!`,
            votes
          })
        })
        .catch((err) => {
          res.status(500).json({
            message:'Error getting votes!',
            err
          })
        })
  },
  voteReadByQuestion: (req, res) => {
    Vote
      .find({question: req.params.id})
      .populate('question')
      .populate('user')
      .exec()
      .then((votes) => {
          res.status(200).json({
            message: `Successfully get requested votes!`,
            votes
          })
        })
        .catch((err) => {
          res.status(500).json({
            message:'Error getting requested votes!',
            err
          })
        })
  },
  voteReadByAnswer: (req, res) => {
    Vote
      .find({answer: req.params.id})
      .populate('answer')
      .populate('user')
      .exec()
      .then((votes) => {
          res.status(200).json({
            message: `Successfully get requested votes!`,
            votes
          })
        })
        .catch((err) => {
          res.status(500).json({
            message:'Error getting requested votes!',
            err
          })
        })
  },
  voteReadById: (req, res) => {
    Vote
      .find({_id: req.params.id})
      .populate('answer')
      .populate('question')
      .populate('user')
      .exec()
      .then((votes) => {
          res.status(200).json({
            message: `Successfully get requested vote!`,
            votes
          })
        })
        .catch((err) => {
          res.status(500).json({
            message:'Error getting requested vote!',
            err
          })
        })
  },
  voteUpdate: (req,res) => {
    let decoded = jwt.verify(req.headers.apptoken, process.env.JWT)    
    Vote
      .findById(req.params.id)
      .then((vote) => {
        if (vote && vote.user == decoded.id) {
          let updateValue = {vote: !vote.vote}
          Vote
            .update(
              {_id: question._id},
              {$set: updateValue}
            )
            .then((response) => {
              res.status(200).json({
                message: `Successfully update vote!`,
                response
              })
            })
            .catch((err) => {
              res.status(500).json({
                message: `Error updating vote!`,
                err
              })
            })
        } else {
          res.status(500).json({
            message: `Error updating vote!`,
            err
          })
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: `Error updating vote!`,
          err
        })
      })
  },
  voteDelete: (req, res) => {
    let decoded = jwt.verify(req.headers.apptoken, process.env.JWT)    
    Vote
      .findById(req.params.id)
      .then((vote) => {
        if (vote && vote.user == decoded.id) {
          Vote
            .remove({_id: req.params.id})
            .then((response) => {
              res.status(200).json({
                message: `Successfully delete vote!`,
                response
              })
            })
            .catch((err) => {
              res.status(500).json({
                message: `Error deleting vote!`,
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
          message: `Error deleting vote!`,
          errr
        })
      })
  },
  voteQuestion: (req, res) => {
    let decoded = jwt.verify(req.headers.apptoken, process.env.JWT)        
    Vote
      .findOne({
        user: decoded.id,
        question: req.params.id
      })
      .then((vote) => {  
        if(vote) {
          let updateValue = {vote: !vote.vote}
          Vote
            .update(
              {_id: vote._id},
              {$set: updateValue}
            )
            .then((response) => {
              res.status(200).json({
                message: `Successfully update vote!`,
                response
              })
            })
            .catch((err) => {
              res.status(500).json({
                message: `Error updating vote!`,
                err
              })
            })
        } else {
          let newVote = new Vote({
            vote: req.body.vote || true,
            user: decoded.id,
            question: req.params.id
          })
          newVote
          .save()
          .then((vote) => {
            res.status(201).json({
              message:'Vote for question successfully created!',
              vote
            })
          })
          .catch((err) => {
            res.status(500).json({
              message:'Error creating new vote for question!',
              err
            })
          })
        }
      })
  },
  voteAnswer: (req, res) => {
    let decoded = jwt.verify(req.headers.apptoken, process.env.JWT)        
    Vote
      .findOne({
        user: decoded.id,
        answer: req.params.id
      })
      .then((vote) => {    
        if(vote) {
          let updateValue = {vote: !vote.vote}
          Vote
            .update(
              {_id: vote._id},
              {$set: updateValue}
            )
            .then((response) => {
              res.status(200).json({
                message: `Successfully update vote!`,
                response
              })
            })
            .catch((err) => {
              res.status(500).json({
                message: `Error updating vote!`,
                err
              })
            })
        } else {
          let newVote = new Vote({
            vote: req.body.vote || true,
            user: decoded.id,
            answer: req.params.id
          })
          newVote
          .save()
          .then((vote) => {
            res.status(201).json({
              message:'Vote for answer successfully created!',
              vote
            })
          })
          .catch((err) => {
            res.status(500).json({
              message:'Error creating new vote for answer!',
              err
            })
          })
        }
      })
  },
}