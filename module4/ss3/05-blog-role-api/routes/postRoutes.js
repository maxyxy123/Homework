const router = require('express').Router();
const c = require('../controllers/postController');
const upload = require('../middlewares/upload');
const { authenticate, authorize } = require('../middlewares/auth');
router.get('/', c.getAll);
router.get('/:id', c.getOne);
router.post('/', upload.single('thumbnail'), c.create);
router.delete('/:id', authenticate, authorize('admin'), c.remove);
module.exports = router;
