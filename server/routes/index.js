const express = require('express');
const {login, verifyToken} = require('../controllers')
const router = express.Router();

router.post('/login', login)
router.get('/verify', verifyToken)

module.exports = router;
