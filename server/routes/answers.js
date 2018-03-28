const router = require('express').Router();
const {answerCreate, answerReadAll, answerReadByQuestion, answerReadById, answerUpdate, answerDelete} = require('../controllers/answer.controller');
const {voteAnswer, voteReadByAnswer} = require('../controllers/vote.controller')
const {authentication, admin} = require('../middlewares/auth');

router.get('/', answerReadAll);
router.get('/search/:id', answerReadById);

router.get('/:questionId', answerReadByQuestion);
router.post('/:questionId', authentication, answerCreate);

router.put('/:id', authentication, answerUpdate);
router.delete('/:id', authentication, answerDelete);

router.get('/:id/vote', authentication, voteReadByAnswer);
router.post('/:id/vote', authentication, voteAnswer);


module.exports = router;
