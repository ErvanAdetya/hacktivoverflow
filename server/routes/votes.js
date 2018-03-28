const router = require('express').Router();
const {voteReadAll} = require('../controllers/vote.controller');

router.get('/', voteReadAll);

module.exports = router;
