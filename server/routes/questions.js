const router = require('express').Router();
const {questionCreate, questionReadAll, questionReadById, questionUpdate, questionDelete} = require('../controllers/question.controller');
const {voteQuestion, voteReadByQuestion} = require('../controllers/vote.controller')
const {authentication, admin} = require('../middlewares/auth');

router.get('/', questionReadAll);
router.post('/', authentication, questionCreate);
router.get('/:id', questionReadById);
router.put('/:id', authentication, questionUpdate);
router.delete('/:id', authentication, questionDelete);
router.get('/:id/vote', authentication, voteReadByQuestion);
router.post('/:id/vote', authentication, voteQuestion);

module.exports = router;
