const router = require('express').Router();
const questionController = require('../controllers/questionController');
const auth = require('../middleware/auth');

router.get('/today', auth, questionController.getTodayQuestion);

module.exports = router;
