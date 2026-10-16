const router = require('express').Router();
const c = require('../controllers/commentController');
const { authenticate } = require('../middlewares/auth');
router.post('/', authenticate, c.create);
router.get('/post/:postId', c.getByPost);
module.exports = router;
