const express = require('express');
const router = express.Router();
const controller = require('../controllers/products');
const { cacheMiddleware } = require('../middleware/cache');

router.get('/', cacheMiddleware, controller.getAll);
router.get('/:id', cacheMiddleware, controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.delete);

module.exports = router;
