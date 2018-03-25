const express = require('express');
const {userCreate} = require('../controllers/user.controller')
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/', userCreate);

module.exports = router;
