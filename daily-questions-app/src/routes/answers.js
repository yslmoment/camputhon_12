const router = require('express').Router();
const answerController = require('../controllers/answerController');
const auth = require('../middleware/auth');

router.post('/', auth, answerController.createAnswer);
router.get('/', auth, answerController.getUserAnswers);

module.exports = router;
